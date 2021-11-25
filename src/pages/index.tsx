import type { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import {
  Grid,
  Heading,
  Box,
  Text,
  Button,
  Flex,
  GridItem,
  Link,
  Avatar,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import CanvasDraw from 'react-canvas-draw';
import { connectToDatabase } from '../database/connect';
import { DrawingData } from '../types';
import { settings } from '../config/settings';
import DrawingService from '../api-lib/services/DrawingService';
import TechStackCard from '../components/TechStackCard';

interface HomeProps {
  drawing: DrawingData;
}

const Home = (props: HomeProps) => {
  const canvasRef = useRef<CanvasDraw>(null);

  useEffect(() => {
    playbackDrawing();
  });

  function playbackDrawing() {
    canvasRef.current?.loadSaveData(props.drawing.penData);
  }

  return (
    <>
      <Head>
        <title>Become Bob Ross - {settings.siteName}</title>
      </Head>
      {/* Hero */}
      <section>
        <Grid
          paddingY={{ base: 10, lg: 14 }}
          paddingX={{ base: 4, lg: 10 }}
          justifyContent='center'
        >
          <Grid
            width='100%'
            maxWidth={1000}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            {/* CTA */}
            <Grid
              placeContent='center'
              width='100%'
              maxWidth={600}
              order={{ base: 2, xl: 1 }}
            >
              <Box>
                <Text fontSize={24} color='blue.600' fontWeight='bold'>
                  Show off your talent
                </Text>
                <Heading paddingTop={1} paddingBottom={1} as='h1' size='2xl'>
                  Share your art work
                </Heading>
                <Text fontSize={18} color='gray.600'>
                  Using our state-of-the-art doodle pad, create your next
                  masterpiece, share it with the community, and rate other
                  artwork.
                </Text>
                <Flex marginTop={10} justify='flex-end'>
                  <Flex justify='flex-start' direction='column'>
                    <Link
                      marginTop={20}
                      paddingY={2}
                      paddingX={4}
                      backgroundColor='yellow.400'
                      href='/api/auth/login'
                      fontSize={20}
                      fontWeight='bold'
                      borderRadius={10}
                      shadow='lg'
                      _hover={{
                        textDecoration: 'none',
                        backgroundColor: 'yellow.500',
                      }}
                    >
                      Signup Today
                    </Link>
                    <Text
                      marginTop={2}
                      marginLeft={2}
                      color='blue.500'
                      id='button-helper-text'
                    >
                      <ArrowUpIcon /> It&apos;s free!
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Grid>

            {/* Canvas */}
            <Grid order={{ base: 1, md: 2 }} placeContent='center'>
              <CanvasDraw
                className='canvas'
                ref={canvasRef}
                disabled={true}
                hideGrid={true}
                hideInterface={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </section>

      {/* Tech Stack */}
      <section id='tech-stack-section'>
        <Box paddingY={{ base: 10, lg: 14 }} paddingX={{ base: 4, lg: 10 }}>
          <Heading as='h2' size='2xl' textAlign='center' color='white'>
            Tech Stack
          </Heading>
          <Flex marginTop={6} justifyContent='center'>
            <Box width='100%' maxWidth={600}>
              <Text fontSize={18} textAlign='center' color='gray.300'>
                This is a full-stack web application built with modern
                JavaScript frameworks and libraries for rapid development and
                high performance for the end-user. It complies with current
                accessibility standards and is responsive on mobile and desktop
                devices.
              </Text>
            </Box>
          </Flex>

          {/* Icons */}
          <Grid justifyContent='center'>
            <Grid
              templateColumns={{
                base: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
              gap={{ base: 4, md: 6 }}
              marginTop={20}
              maxWidth={700}
              width='100%'
            >
              <TechStackCard
                imgSrc='/auth0.png'
                alt='Auth0 Logo'
                title='Auth0'
              />
              <TechStackCard
                imgSrc='/chakraui.png'
                alt='ChakraUI Logo'
                title='ChakraUI'
              />
              <TechStackCard
                imgSrc='/cloudinary.png'
                alt='Cloudinary Logo'
                title='Cloudinary'
              />
              <TechStackCard
                imgSrc='/mongodb.png'
                alt='MongoDB Logo'
                title='MongoDB'
              />
              <TechStackCard
                imgSrc='/nextjs.png'
                alt='NextJS Logo'
                title='NextJS'
              />
            </Grid>
          </Grid>
        </Box>
      </section>

      {/* About Us */}
      <section>
        <Box
          backgroundColor='white'
          paddingY={{ base: 10, lg: 14 }}
          paddingX={{ base: 4, lg: 10 }}
        >
          <Heading textAlign='center' as='h2' size='2xl'>
            About Us
          </Heading>

          <Grid justifyContent='center'>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(5, 1fr)' }}
              paddingY={10}
              maxWidth={800}
              width='100%'
            >
              <GridItem colSpan={2}>
                <Flex direction='column' alignItems='center'>
                  <Avatar size='xl' name='Peter Tran' src='/me.jpg' />
                  <Heading as='h3' padding={4}>
                    Peter Tran
                  </Heading>
                </Flex>
              </GridItem>
              <GridItem colSpan={3}>
                <Flex justifyContent='center'>
                  <Text fontSize={18}>
                    I have a background in the construction industry as a
                    Quality Assurance Technician. After experiencing a back
                    injury in 2018, I decided to pivot to a different career
                    path. I then attended a coding boot camp where I discovered
                    my passion for coding. I haven&apos;t stopped coding since.
                    I&apos;m a natural problem solver and love learning. Outside
                    of coding, I am a motorcycle enthusiast and an avid
                    BBQ&apos;er.
                  </Text>
                </Flex>
              </GridItem>
            </Grid>
          </Grid>
        </Box>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resp = {
    props: {},
    revalidate: 1,
  };

  try {
    const id = '619e0b4edb0aff107ad5c09b';
    const { db } = await connectToDatabase();
    const drawingService = new DrawingService(db);
    const drawing = await drawingService.getDrawingById(id);

    resp.props['drawing'] = drawing;
  } catch (error) {
    console.log(error);
    resp.props['error'] = { message: error.message };
  }

  return resp;
};

export default Home;
