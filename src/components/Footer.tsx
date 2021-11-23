import {Box} from '@chakra-ui/react';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <Box mt={10}>
        Created by <a href="https://github.com/tranpeter08">Peter Tran</a>
      </Box>
    </footer>
  );
}
