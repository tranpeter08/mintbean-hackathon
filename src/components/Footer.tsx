import {Box, Text, Link} from '@chakra-ui/react';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <Box backgroundColor="black" width="100%" mt={10}>
        <Text color="white" p={5} textAlign="center">
          This web application was created by{' '}
          <Link
            color="blue.500"
            fontWeight="bold"
            href="https://github.com/tranpeter08"
          >
            Peter Tran
          </Link>
        </Text>
      </Box>
    </footer>
  );
}
