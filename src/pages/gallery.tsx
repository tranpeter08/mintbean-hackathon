import type { NextPage, GetStaticProps, GetStaticPropsResult } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { Grid, Heading, Box, Flex, Link, Text } from '@chakra-ui/react';
import { connectToDatabase } from '../database/connect';
import { DrawingData } from '../types';
import DrawingCard from '../components/DrawingCard';
import SignupMessage from '../components/SignupMessage';
import { settings } from '../config/settings';

interface HomeProps {
  drawings: [DrawingData];
}

const Gallery: NextPage<HomeProps> = ({ drawings }) => {
  const drawingCards = drawings.map((drawing) => {
    return (
      <DrawingCard
        key={drawing._id}
        src={drawing.url}
        alt={`A drawing by a user`}
        id={drawing._id}
      />
    );
  });

  const hasDrawings = drawingCards.length > 0;

  return (
    <>
      <Head>
        <title>Art Gallery - {settings.siteName}</title>
      </Head>
      <Heading mt={10} textAlign='center' as='h1'>
        Art Gallery
      </Heading>

      {!hasDrawings && (
        <Box mt={20}>
          <SignupMessage />
        </Box>
      )}

      <Flex justifyContent='center'>
        <Grid
          marginTop={10}
          marginBottom={10}
          width='100%'
          maxWidth={1200}
          padding={6}
          gap={{ base: 5, sm: 7, md: 8, lg: 8 }}
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          justifyContent='center'
        >
          {hasDrawings && drawingCards}
        </Grid>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { db } = await connectToDatabase();
    const results = await db
      .collection('drawings')
      .find({}, { limit: 100 })
      .project({ _id: true, url: true })
      .toArray();

    const drawings = JSON.parse(JSON.stringify(results));

    return {
      props: { drawings },
      revalidate: 30,
    };
  } catch (error) {
    console.log(error);
    return {
      props: { drawings: [], error: { message: error.message } },
      revalidate: 30,
    };
  }
};

export default Gallery;
