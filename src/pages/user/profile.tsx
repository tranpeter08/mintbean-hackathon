import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import DrawingService from '../../api-lib/services/DrawingService';
import DrawingCard from '../../components/DrawingCard';
import { connectToDatabase } from '../../database/connect';
import {
  Flex,
  Grid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';

interface ProfileProps {
  user: { email: string };
  drawings: [
    {
      _id: string;
      url: string;
    }
  ];

  error?: { message: string };
}

export default function Profile(props: ProfileProps) {
  const { user, drawings } = props;
  const drawingCount = Array.isArray(drawings) ? drawings.length : 0;
  const hasDrawings = drawingCount > 0;

  const drawingCards =
    drawingCount &&
    drawings.map(({ _id, url }) => (
      <DrawingCard
        key={_id}
        id={_id}
        src={url}
        alt={`${user.email}'s drawing'`}
      />
    ));

  return (
    <>
      <Box p={5}>
        <Flex justifyContent='center'>
          <Box paddingY={5}>
            <Stat
              borderRadius={10}
              width={320}
              padding={4}
              backgroundColor='white'
            >
              <StatLabel>
                Logged in as:
                <br />
                <Text fontWeight='bold'>{user.email}</Text>
              </StatLabel>
              <StatNumber textAlign='center' paddingTop={4}>
                You have <br />
                <Text p={0} color='blue.500'>
                  {drawings.length}
                </Text>
                drawing{drawingCount > 0 && 's'}
              </StatNumber>
            </Stat>
          </Box>
        </Flex>
        <Flex justifyContent='center'>
          <Grid
            width='100%'
            maxWidth={1200}
            padding={5}
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
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  async getServerSideProps({ req, res }) {
    const props = { drawings: [] };
    try {
      const { user } = getSession(req, res);
      const { db } = await connectToDatabase();
      const drawingService = new DrawingService(db);
      const drawings = await drawingService.getDrawingsByEmail(user.email);

      props['drawings'] = drawings;
    } catch (error) {
      const message = error.message;
      console.log(message);
      props['error'] = { message };
    }

    return {
      props,
    };
  },
});
