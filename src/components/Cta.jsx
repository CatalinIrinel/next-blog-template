'use client';

import { Link } from '@chakra-ui/next-js';
import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

const Cta = () => {
  return (
    <Container
      w={'full'}
      maxW={'100vw'}
      py={{ base: '1rem', md: '2rem' }}
      px={{ base: '1rem', lg: '3rem' }}
      bg={'main'}
      color={'contrast'}
      boxShadow={'0 0 .6rem rgba(0,0,0,0.2)'}
    >
      <Stack
        spacing={{ base: '4', md: '5' }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Stack spacing={{ base: '2', md: '3' }} align="center">
          <Heading as={'h2'} size={{ base: 'sm', md: 'md' }}>
            Vrei să îți faci vocea auzită?
          </Heading>
          <Text color="textDark" maxW="2xl" textAlign="center" fontSize="xl">
            Accesează acum VOX Press, partenerul nostru în presă!
          </Text>
        </Stack>
        <Stack
          spacing="3"
          direction={{ base: 'column', sm: 'row' }}
          justify="center"
          align={'center'}
        >
          <Link href="https://voxpress.ro">
            <Button variant="secondary">Află mai multe</Button>
          </Link>
          <Link href="https://app.voxpress.ro/register">
            <Button bg={'bg'} color={'text'} _hover={{ bg: 'contrastDark' }}>
              Începe acum
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Cta;
