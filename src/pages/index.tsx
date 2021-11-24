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
import {Grid, Heading, Box, Text} from '@chakra-ui/react';
import {connectToDatabase} from '../database/connect';
import {DrawingData} from '../types';
import DrawingCard from '../components/DrawingCard';
import {settings} from '../config/settings';

interface HomeProps {
  drawings: [DrawingData];
}

const Home = (props: HomeProps) => {
  return (
    <>
      <Head>
        <title>Drawing Gallery - {settings.siteName}</title>
      </Head>

      {/* Hero */}
      <Grid>
        <Grid></Grid>
        <Grid></Grid>
      </Grid>
      <Grid></Grid>

      {/* Tech Stack */}
      <Heading></Heading>
      <Text></Text>
      <Grid>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Grid>

      {/* About Us */}
      <Heading mt={10} textAlign="center" as="h1">
        Recent Drawings
      </Heading>
    </>
  );
};

export default Home;
