import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  GetStaticPropsContext,
} from 'next';
import {Box, Button, Flex} from '@chakra-ui/react';
import CanvasDraw from 'react-canvas-draw';
import {useRef, useState} from 'react';
import {connectToDatabase} from '../../../database/connect';
import {ParsedUrlQuery} from 'querystring';
import {DrawingData} from '../../../types';
import {ObjectId} from 'mongodb';

interface DrawingProps {
  drawing: DrawingData;
}

export default function Drawing(props: DrawingProps) {
  const canvasRef = useRef<CanvasDraw>(null);

  function handlePlay() {
    canvasRef.current?.loadSaveData(props.drawing.penDataJSON);
  }

  return (
    <Flex justifyContent="center">
      <Box>
        <CanvasDraw ref={canvasRef} />
        <Flex mt={10} justifyContent="center">
          <Button colorScheme="green" onClick={handlePlay}>
            Start Playback
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {db} = await connectToDatabase();
  const drawings = await db
    .collection('drawings')
    .find({}, {limit: 100})
    .project({_id: {$toString: '$_id'}})
    .toArray();

  const paths = drawings.map((drawing) => {
    return {params: {id: drawing._id}};
  });

  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async (
  contex: GetStaticPropsContext
) => {
  try {
    const {params} = contex;

    if (typeof params?.id === 'undefined') throw 'no ID';

    const {id} = params;

    if (Array.isArray(id)) throw 'invalid param';

    const _id = new ObjectId(id);
    const {db} = await connectToDatabase();
    const results = await db
      .collection('drawings')
      .find({_id})
      .project({penData: true})
      .toArray();

    return {
      props: {
        drawing: {
          penDataJSON: results[0].penData,
        },
      },
    };
  } catch (error) {
    return {props: {}};
  }
};
