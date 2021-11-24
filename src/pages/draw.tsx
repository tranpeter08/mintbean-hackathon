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
        clear();
      }
    } catch (error: any) {
      setSubmitting(false);
      console.log(error?.data);
    }
  }

  return (
    <>
      <Heading mt={10} textAlign="center" as="h1">
        Draw Your Masterpiece
      </Heading>
      <Box mt={10}>
        <form onSubmit={getSavedData}>
          <Flex id="canvas-container" justifyContent="center">
            <Box id="canvas-box" borderWidth={1} shadow="xl">
              <CanvasDraw
                ref={canvasRef}
                lazyRadius={2}
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
            <Stack mt={6} direction="row" spacing={4}>
              <Button colorScheme="blue" shadow="xl" onClick={undo}>
                Undo
              </Button>
              <Button colorScheme="blue" shadow="xl" onClick={eraseAll}>
                Erase All
              </Button>
              <Button colorScheme="blue" shadow="xl" onClick={reset}>
                Reset Position
              </Button>
            </Stack>
          </Flex>
          <Flex mt={6} justifyContent="center">
            <Button
              colorScheme="pink"
              shadow="xl"
              onClick={clear}
              variant="outline"
            >
              Clear
            </Button>
          </Flex>

          <Flex justifyContent="center">
            <Stack direction={{base: 'column', md: 'row'}}>
              <Box>
                <Text mt={10} fontWeight="bold" fontSize="lg" align="center">
                  Brush Color
                </Text>
                <Flex mt={4} justifyContent="center">
                  <Input
                    aria-label="Brush Color"
                    type="color"
                    onChange={handleColor}
                    width={16}
                    boxSize={20}
                    padding={2}
                    backgroundColor="white"
                  />
                </Flex>
              </Box>

              <Box>
                <Text mt={10} fontWeight="bold" fontSize="lg" align="center">
                  Brush Radius
                </Text>
                <Flex mt={4} justifyContent="center" alignItems="center">
                  <NumberInput
                    id="brush-radius-input"
                    maxW="100px"
                    mr={2}
                    value={brushRadius}
                    onChange={handleBrushRadius}
                    step={0.01}
                    precision={2}
                    min={0.01}
                    max={50}
                    backgroundColor="white"
                  >
                    <NumberInputField width={20} aria-label="Brush Radius" />
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
                    width={200}
                  >
                    <SliderTrack bgColor="white">
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb aria-label="Brush Radius" p={5}>
                      <Text fontSize="sm">{brushRadius}</Text>
                    </SliderThumb>
                  </Slider>
                </Flex>
              </Box>
            </Stack>
          </Flex>

          <Flex mt={10} justifyContent="center">
            <Button
              isLoading={submitting}
              type="submit"
              shadow="xl"
              colorScheme="green"
              mb={10}
            >
              Save To Gallery
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default Draw;
