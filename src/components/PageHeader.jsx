'use client';

import { Box, HStack, Heading, Image } from '@chakra-ui/react';

const PageHeader = ({ titlu }) => {
  return (
    <HStack
      w={'full'}
      alignItems={'center'}
      justifyContent={'center'}
      position={'relative'}
      h={{ base: '200px', lg: '30vh' }}
    >
      <Box
        w={'full'}
        h={{ base: '200px', lg: '30vh' }}
        zIndex={2}
        position={'absolute'}
        bg={'overlay'}
      ></Box>
      <Image
        loading="lazy"
        position={'absolute'}
        zIndex={1}
        h={{ base: '200px', lg: '30vh' }}
        w={'full'}
        objectFit={'cover'}
        src={'/images/6.webp'}
        alt={'nume ziar'}
      />
      <Heading
        as={'h1'}
        zIndex={3}
        textTransform={'uppercase'}
        color={'main'}
        fontSize={{ base: '2rem', lg: '4rem' }}
      >
        {titlu}
      </Heading>
    </HStack>
  );
};

export default PageHeader;
