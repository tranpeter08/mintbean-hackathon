import Image from 'next/image';
import { Box, Heading, Flex } from '@chakra-ui/react';

interface TechStackCardProps {
  title: string;
  imgSrc: string;
  alt: string;
}

export default function TechStackCard(props: TechStackCardProps) {
  const { title, imgSrc, alt } = props;

  return (
    <Flex justifyContent='center'>
      <Flex direction='column' alignItems='center'>
        <Image src={imgSrc} alt={alt} width={80} height={80} />
        <Heading padding={4} as='h3' size='lg' color='white' textAlign='center'>
          {title}
        </Heading>
      </Flex>
    </Flex>
  );
}
