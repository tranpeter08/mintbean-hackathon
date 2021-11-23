import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
} from 'next';
import Head from 'next/head';
import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
} from 'react';
import axios from 'axios';
import {Grid, Heading} from '@chakra-ui/react';
import {connectToDatabase} from '../database/connect';
import {DrawingData} from '../types';
import DrawingCard from '../components/DrawingCard';
import {settings} from '../config/settings';

interface HomeProps {
  drawings: [DrawingData];
}

const Home = (props: HomeProps) => {
  const {drawings} = props;

  return (
    <>
      <Head>
        <title>Drawing Gallery - {settings.siteName}</title>
      </Head>
      <Heading textAlign="center" as="h1">
        Recent Drawings
      </Heading>
      <Grid
        p={6}
        templateColumns={{
          base: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gap={6}
      >
        {drawings &&
          drawings.map((drawing, index) => {
            return (
              <DrawingCard
                key={drawing._id}
                src={drawing.url}
                alt={`drawing #${index + 1}`}
                id={drawing._id}
              />
            );
          })}
      </Grid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const {db} = await connectToDatabase();
    const results = await db
      .collection('drawings')
      .find({}, {limit: 100})
      .project({_id: true, url: true})
      .toArray();

    const drawings = JSON.parse(JSON.stringify(results));

    return {
      props: {drawings},
      revalidate: 30,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {drawings: []},
    };
  }
};

export default Home;
