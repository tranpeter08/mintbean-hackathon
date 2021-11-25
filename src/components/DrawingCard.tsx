import { Image, Link, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';

interface DrawingCardProps {
  src: string;
  alt: string;
  id: string;
}

export default function DrawingCard(props: DrawingCardProps) {
  const { src, id, alt } = props;

  return (
    <NextLink href={`/drawing/${id}`} passHref>
      <Link backgroundColor='white' shadow='2xl' _hover={{ shadow: 'dark-lg' }}>
        <Image src={src} alt={alt} />
      </Link>
    </NextLink>
  );
}
