import type { NextPage } from 'next';
import { ChangeEvent, useState, useRef, FormEvent, useEffect } from 'react';
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
  Link,
  useToast,
} from '@chakra-ui/react';
import Color from 'color';
import { useUser } from '@auth0/nextjs-auth0';

const Draw: NextPage = () => {
  const canvasRef = useRef(null);
  const [brushColor, setbrushColor] = useState<string>('#000000');
  const [brushRadius, setBrushRadius] = useState<number>(12);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [storedPenData, setStoredPenData] = useState<string>(null);
  const toast = useToast();
  const { user } = useUser();
  const isLoggedIn = typeof user !== 'undefined';
  const penDataKey = 'pen_data';

  function loadlocalPenData() {
    console.log(canvasRef);
    const data = localStorage.getItem(penDataKey);

    console.log({ data });
    if (typeof data !== 'string') return;

    try {
      canvasRef.current.loadSaveData(data);
      localStorage.removeItem(penDataKey);
    } catch (error) {
      localStorage.removeItem(penDataKey);
      toast({
        title: 'Error',
        description: 'Could not load previous drawing',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  }

  function saveLocalPenData() {
    try {
      const penData = canvasRef.current.getSaveData();
      localStorage.setItem(penDataKey, penData);
    } catch (error) {
      console.error(`Unable to save pen data`);
    }
  }

  useEffect(() => {
    loadlocalPenData();
    return () => {
      saveLocalPenData;
    };
  }, []);

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

    if (!isLoggedIn) return;

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

        const { data } = await axios.post('/api/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setSubmitting(false);
        clear();
        toast({
          title: 'Succes!',
          description: 'Drawing saved.  It will appear in the gallery soon.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error: any) {
      setSubmitting(false);
      console.log(error?.data);
      toast({
        title: 'Error',
        description: 'Something went wrong. Drawing was not saved :(',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  }

  function redirectToLogin() {
    saveLocalPenData();
    window.location.assign('/api/auth/login');
  }

  return (
    <>
      <Heading mt={10} textAlign='center' as='h1'>
        Draw Your Masterpiece
      </Heading>
      <Box paddingY={10}>
        <form onSubmit={getSavedData}>
          <Flex id='canvas-container' justifyContent='center'>
            <Box id='canvas-box' borderWidth={1} shadow='xl'>
              <CanvasDraw
                className='canvas'
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

          {/* Brush Controls */}
          <Flex justifyContent='center'>
            <Stack direction={{ base: 'column', md: 'row' }}>
              <Box>
                <Flex mt={4} justifyContent='center'>
                  <Input
                    aria-label='Brush Color'
                    type='color'
                    onChange={handleColor}
                    boxSize={10}
                    padding={1}
                    backgroundColor='white'
                  />
                </Flex>
              </Box>

              <Box>
                <Flex mt={4} justifyContent='center' alignItems='center'>
                  <NumberInput
                    p={0}
                    id='brush-radius-input'
                    mr={8}
                    value={brushRadius}
                    onChange={handleBrushRadius}
                    step={0.01}
                    precision={2}
                    min={0.01}
                    max={50}
                    backgroundColor='white'
                    aria-label='Brush Radius'
                  >
                    <NumberInputField width={24} aria-label='Brush Radius' />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <Slider
                    id='brush-radius-slider'
                    focusThumbOnChange={false}
                    value={brushRadius}
                    onChange={handleBrushRadiusSlider}
                    step={0.01}
                    min={0.01}
                    max={60}
                    width={140}
                  >
                    <SliderTrack bgColor='white'>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb aria-label='Brush Radius' p={5}>
                      <Text fontSize='sm'>{brushRadius}</Text>
                    </SliderThumb>
                  </Slider>
                </Flex>
              </Box>
            </Stack>
          </Flex>

          {/* Canvas Controls */}
          <Flex justifyContent='center'>
            <Stack mt={6} direction='row' spacing={4}>
              <Button colorScheme='blue' shadow='xl' onClick={undo}>
                Undo
              </Button>
              <Button colorScheme='blue' shadow='xl' onClick={eraseAll}>
                Erase All
              </Button>
              <Button colorScheme='blue' shadow='xl' onClick={reset}>
                Reset Position
              </Button>
            </Stack>
          </Flex>
          <Flex mt={6} justifyContent='center'>
            <Button
              colorScheme='pink'
              shadow='xl'
              onClick={clear}
              variant='outline'
            >
              Clear
            </Button>
          </Flex>
          <Flex mt={10} justifyContent='center'>
            {isLoggedIn ? (
              <Button
                isLoading={submitting}
                type='submit'
                shadow='xl'
                colorScheme='green'
                mb={10}
              >
                Save To Gallery
              </Button>
            ) : (
              <Button
                isLoading={submitting}
                type='submit'
                shadow='xl'
                colorScheme='yellow'
                mb={10}
                onClick={redirectToLogin}
              >
                Login to save
              </Button>
            )}
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default Draw;
