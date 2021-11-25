import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import CanvasDraw from 'react-canvas-draw';
import { useRef, useState } from 'react';
import { connectToDatabase } from '../../database/connect';
import { DrawingData } from '../../types';
import { ObjectId } from 'mongodb';
import DrawingServices from '../../api-lib/services/DrawingService';

interface DrawingProps {
  drawing: DrawingData;
}
export default function Drawing(props: DrawingProps) {
  const canvasRef = useRef<CanvasDraw>(null);

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
  const { db } = await connectToDatabase();
  const drawingService = new DrawingServices(db);
  const drawings = await drawingService.getRecentDrawings();

  const paths = drawings.map((drawing) => {
    return { params: { id: drawing._id } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  contex: GetStaticPropsContext
) => {
  try {
    const { params } = contex;

    if (typeof params?.id === 'undefined') throw 'no ID';

    const { id } = params;

    if (Array.isArray(id)) throw 'invalid param';

    const { db } = await connectToDatabase();
    const drawingService = new DrawingServices(db);
    const results = await drawingService.getDrawingById(id);

    return {
      props: {
        drawing: {
          penData: results.penData,
        },
      },
    };
  } catch (error) {
    const message = error.message;
    console.log(message);
    return {
      props: {
        drawing: {
          penData: null,
        },
        error: { message },
      },
    };
  }
};
