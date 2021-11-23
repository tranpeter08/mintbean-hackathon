import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
  FormEvent,
} from 'react';
import axios from 'axios';
import CanvasDraw from 'react-canvas-draw';
import {
  Input,
  Button,
  NumberInput,
  Flex,
  NumberInputField,
  SliderFilledTrack,
  SliderThumb,
  Slider,
  SliderTrack,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Box,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';
import Color from 'color';

const Draw: NextPage = () => {
  const canvasRef = useRef(null);
  const [brushColor, setbrushColor] = useState<string>('#000000');
  const [brushRadius, setBrushRadius] = useState<number>(12);
  const [submitting, setSubmitting] = useState<boolean>(false);

  function handleColor(event: ChangeEvent<HTMLInputElement>) {
    setbrushColor(event.target.value);
  }

  function handleBrushRadius(_: string, numberValue: number) {
    setBrushRadius(numberValue);
  }

  function handleBrushRadiusSlider(value: number) {
    setBrushRadius(value);
  }

  function undo() {
    const canvas: any = canvasRef.current;
    if (canvas instanceof CanvasDraw) {
      canvas.undo();
    }
  }

  function clear() {
    const canvas: any = canvasRef.current;
    if (canvas instanceof CanvasDraw) {
      canvas.clear();
    }
  }
  function eraseAll() {
    const canvas: any = canvasRef.current;
    if (canvas instanceof CanvasDraw) {
      // @ts-ignore
      canvas.eraseAll();
    }
  }

  function reset() {
    const canvas: any = canvasRef.current;
    if (canvas instanceof CanvasDraw) {
      // @ts-ignore
      canvas.resetView();
    }
  }

  async function getSavedData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const canvas: any = canvasRef.current;

      if (canvas instanceof CanvasDraw) {
        setSubmitting(true);
        const penData = canvas.getSaveData();

        // @ts-ignore
        const dataUrl = canvas?.getDataURL();
        const form = new FormData();

        form.append('file', dataUrl);
        form.append('penData', penData);

        const {data} = await axios.post('/api/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setSubmitting(false);
      }
    } catch (error: any) {
      setSubmitting(false);
      console.log(error?.data);
    }
  }

  return (
    <>
      <Heading textAlign="center" as="h1">
        Draw Your Masterpiece
      </Heading>
      <Box mt={10}>
        <form onSubmit={getSavedData}>
          <Flex justifyContent="center">
            <Box id="canvas-box" borderWidth={1} borderColor="black">
              <CanvasDraw
                ref={canvasRef}
                brushRadius={brushRadius}
                brushColor={brushColor}
                catenaryColor={Color(brushColor).negate().hex()}
                // @ts-ignore
                enablePanAndZoom={true}
                canvasHeight={400}
                canvasWidth={400}
                disabled={submitting}
              />
            </Box>
          </Flex>
          <Flex justifyContent="center">
            <Stack mt={6} mb={6} direction="row" spacing={4}>
              <Button shadow="xl" onClick={undo}>
                Undo
              </Button>
              <Button shadow="xl" onClick={eraseAll}>
                Erase All
              </Button>
              <Button shadow="xl" onClick={reset}>
                Reset Position
              </Button>
              <Button
                colorScheme="pink"
                shadow="xl"
                onClick={clear}
                variant="outline"
              >
                Clear
              </Button>
            </Stack>
          </Flex>
          <Flex justifyContent="center">
            <Button
              isLoading={submitting}
              type="submit"
              shadow="xl"
              colorScheme="green"
            >
              Save To Gallery
            </Button>
          </Flex>
        </form>
      </Box>

      <Box mt={10}>
        <Text fontWeight="bold" fontSize="lg" align="center">
          Brush Color
        </Text>
        <Flex justifyContent="center">
          <Input
            aria-label="Brush Color"
            type="color"
            onChange={handleColor}
            width={20}
            height={20}
            padding={2}
          />
        </Flex>
      </Box>

      <Box mt={10}>
        <Text fontWeight="bold" fontSize="lg" align="center">
          Brush Radius
        </Text>
        <Flex justifyContent="center">
          <NumberInput
            id="brush-radius-input"
            maxW="100px"
            mr="2rem"
            value={brushRadius}
            onChange={handleBrushRadius}
            step={0.01}
            precision={2}
            min={0.01}
            max={60}
          >
            <NumberInputField aria-label="Brush Radius" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Slider
            id="brush-radius-slider"
            focusThumbOnChange={false}
            value={brushRadius}
            onChange={handleBrushRadiusSlider}
            step={0.01}
            min={0.01}
            max={60}
            maxWidth={400}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb aria-label="Brush Radius" p={5}>
              <Text fontSize="sm">{brushRadius}</Text>
            </SliderThumb>
          </Slider>
        </Flex>
      </Box>
    </>
  );
};

export default Draw;
