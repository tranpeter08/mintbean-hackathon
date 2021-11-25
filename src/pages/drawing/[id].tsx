import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react';
import CanvasDraw from 'react-canvas-draw';
import { useRef, useState } from 'react';
import { connectToDatabase } from '../../database/connect';
import { DrawingData } from '../../types';
import { ObjectId } from 'mongodb';
import DrawingServices from '../../api-lib/services/DrawingService';
import { useRouter } from 'next/router';

interface DrawingProps {
  drawing: DrawingData;
}
export default function Drawing(props: DrawingProps) {
  const canvasRef = useRef<CanvasDraw>(null);
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Flex>
        <Flex>
          <Heading>Loading Canvas....</Heading>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Flex>
      </Flex>
    );
  }

  function handlePlay() {
    canvasRef.current?.loadSaveData(props.drawing.penData);
  }

  return (
    <>
      <Box p={10}>
        <Heading textAlign='center' as='h1'>
          Drawing Playback
        </Heading>
        <Flex mt={10} justifyContent='center'>
          <Box>
            <Box shadow='2xl'>
              <CanvasDraw
                className='canvas'
                hideInterface={true}
                hideGrid={true}
                disabled
                ref={canvasRef}
              />
            </Box>
            <Flex mt={10} justifyContent='center'>
              <Button colorScheme='green' onClick={handlePlay}>
                Start Playback
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  try {
    const { db } = await connectToDatabase();
    const drawingService = new DrawingServices(db);
    const drawings = await drawingService.getRecentDrawings();

    for (const drawing of drawings) {
      paths.push({ params: { id: drawing._id } });
    }
  } catch (error) {
    console.log(error.message);
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (
  contex: GetStaticPropsContext
) => {
  const props = {
    drawing: null,
  };

  const { params } = contex;

  try {
    if (typeof params?.id === 'undefined') throw 'no ID';

    const { id } = params;

    if (Array.isArray(id)) throw 'invalid param';

    const { db } = await connectToDatabase();
    const drawingService = new DrawingServices(db);
    const results = await drawingService.getDrawingById(id);

    props.drawing = {
      penData: results.penData,
    };
  } catch (error) {
    const message = error.message;
    console.log(message);
    props['error'] = { message };
  }

  return {
    props,
    revalidate: 10,
  };
};
