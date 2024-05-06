'use client';
import { Link } from '@chakra-ui/next-js';
import { Divider, HStack, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = ({ footer, navbar }) => {
  return (
    <Stack
      w={'full'}
      px={{ base: '1rem', lg: '4rem' }}
      py={'2rem'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={'main'}
      color={'contrast'}
      gap={'2rem'}
    >
      <HStack
        w={'full'}
        maxW={{ base: 'full', lg: '80rem' }}
        justifyContent={{ base: 'center', lg: 'space-evenly' }}
        alignItems={{ base: 'center', lg: 'flex-start' }}
        flexWrap={'wrap'}
        gap={{ base: '2rem', lg: 0 }}
      >
        <Stack>
          <Image w={'200px'} src={footer.logo.image} alt={footer.logo.name} />
          <Heading as={'h2'} fontSize={'1.5rem'}>
            {footer.logo.slogan}
          </Heading>
        </Stack>
        <Stack gap={'1rem'} w={{ base: '300px', lg: 'auto' }}>
          <Heading
            as={'h3'}
            fontSize={'1.5rem'}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Categorii
          </Heading>
          <HStack
            gap={'2rem'}
            maxW={{ base: '300px', lg: '30rem' }}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
          >
            {navbar.items.map((item) => (
              <Link key={item.name} href={item.link}>
                <Text textTransform={'capitalize'} textDecoration={'underline'}>
                  {item.name}
                </Text>
              </Link>
            ))}
          </HStack>
        </Stack>
        <Stack gap={'1rem'}>
          <Heading
            as={'h3'}
            fontSize={'1.5rem'}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Legal
          </Heading>
          <Stack>
            <Link href={'/gdpr'}>
              <Text textTransform={'capitalize'} textDecoration={'underline'}>
                politica de confidențialitate
              </Text>
            </Link>
            <Link href={'/termeni-conditii'}>
              <Text textTransform={'capitalize'} textDecoration={'underline'}>
                termeni și condiții
              </Text>
            </Link>
            <Link href={'/cookies'}>
              <Text textTransform={'capitalize'} textDecoration={'underline'}>
                politica cookie
              </Text>
            </Link>
          </Stack>
        </Stack>
      </HStack>
      <Divider />
      <HStack>
        <Text>Creat de Digidev Innotech S.R.L</Text>
        <Text>
          <strong>&#9400; {new Date().getFullYear()}</strong>
        </Text>
      </HStack>
    </Stack>
  );
};

export default Footer;
