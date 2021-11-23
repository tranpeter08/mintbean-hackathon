import {ReactNode} from 'react';
import Header from './Header';
import Footer from './Footer';
import {ChakraProvider} from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <ChakraProvider>
      <Header />
      {props.children}
      <Footer />
    </ChakraProvider>
  );
}
