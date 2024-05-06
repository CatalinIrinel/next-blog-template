'use client';
import {
  HStack,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from '@chakra-ui/next-js';
import { useToggle } from '../Context';

const Navbar = ({ navbar }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { toggle } = useToggle();
  return (
    <HStack
      w={'full'}
      justifyContent={'space-between'}
      px={{ base: '1rem', lg: '3rem' }}
      py={'1rem'}
      bg={'main'}
      color={'titleDark'}
      position={'fixed'}
      top={0}
      left={0}
      zIndex={1000}
    >
      <Link href="/">
        <Image w={'150px'} src={navbar.logo.image} alt={'nume ziar'} />
      </Link>
      <HStack gap={'2rem'}>
        {isDesktop ? (
          <>
            {navbar.items.map((item) => (
              <Link key={item.name} href={item.link}>
                <Text
                  className="signika-bold"
                  _hover={{
                    borderBottom: '3px solid',
                    borderBottomColor: 'contrast',
                  }}
                  textTransform={'capitalize'}
                >
                  {item.name}
                </Text>
              </Link>
            ))}
          </>
        ) : (
          <>
            <IconButton
              variant="ghost"
              color={'textLight'}
              icon={<FiMenu fontSize="1.5rem" />}
              aria-label="Open Menu"
              _hover={'none'}
              _active={'none'}
              _focus={'none'}
              onClick={toggle}
            />
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
