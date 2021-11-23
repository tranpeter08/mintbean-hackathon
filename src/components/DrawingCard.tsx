import {Box, Image, Link} from '@chakra-ui/react';
import NextLink from 'next/link';

interface DrawingCardProps {
  src: string;
  alt: string;
  id: string;
}

export default function DrawingCard(props: DrawingCardProps) {
  const {src, id, alt} = props;

  const responsive = {
    base: 100,
    md: 150,
    lg: 180,
  };

  return (
    <NextLink href={`/drawing/${id}`} passHref>
      <Link>
        <Image
          shadow="xl"
          _hover={{borderColor: 'teal.500', borderWidth: 1}}
          boxSize={responsive}
          src={src}
          alt={alt}
        />
      </Link>
    </NextLink>
  );
}
