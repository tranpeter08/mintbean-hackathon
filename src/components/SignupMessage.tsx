import { Text, Link, Box, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { pageRoutes } from '../config/pageRoutes';

export default function SignUpMessage(props) {
  return (
    <Flex justifyContent='center'>
      <Text fontSize={24}>
        Looks like the art gallery is empty. Be the first to share your art
        work,{' '}
        <NextLink href={'/api/auth/login'} passHref>
          <Link color='blue.500'>signup</Link>
        </NextLink>{' '}
        today!
      </Text>
    </Flex>
  );
}
