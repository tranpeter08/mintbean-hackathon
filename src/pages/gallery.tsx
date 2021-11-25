import type { NextPage, GetStaticProps, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import {
  Grid,
  Heading,
  Box,
  Flex,
  Link,
  Text,
  useToast,
  Spinner,
  CircularProgress,
} from '@chakra-ui/react';
import { DrawingData } from '../types';
import DrawingCard from '../components/DrawingCard';
import SignupMessage from '../components/SignupMessage';
import { settings } from '../config/settings';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface HomeProps {
  drawings: [DrawingData];
}

const Gallery: NextPage = () => {
  const [drawings, setDrawings] = useState<DrawingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchDrawings();
  }, []);

  async function fetchDrawings() {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/drawings/latest');
      setDrawings(data.data?.drawings);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      toast({
        isClosable: true,
        status: 'error',
        title: 'Error',
        description: 'Error getting drawings, try again later',
        duration: 5000,
      });
    }
  }

  const drawingCards =
    drawings &&
    drawings.map((drawing) => {
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
      <Box paddingY={10}>
        <Heading textAlign='center' as='h1'>
          Art Gallery
        </Heading>

        {loading && (
          <Box paddingY={10}>
            <Heading as='h2' size='lg' textAlign='center'>
              Loading Drawings...
            </Heading>
            <Flex paddingTop={10} justifyContent='center'>
              <CircularProgress
                justifyContent='center'
                isIndeterminate
                color='blue.500'
                value={30}
                size='120px'
              />
            </Flex>
          </Box>
        )}

        {!loading && !hasDrawings && (
          <Box mt={20}>
            <SignupMessage />
          </Box>
        )}

        <Flex justifyContent='center'>
          <Grid
            marginTop={10}
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
      </Box>
    </>
  );
};

export default Gallery;
