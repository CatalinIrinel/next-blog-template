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
      h={'100px'}
      justifyContent={'space-between'}
      px={{ base: '1rem', lg: '3rem' }}
      py={'1rem'}
      bg={'main'}
      color={'contrast'}
      position={'fixed'}
      top={0}
      left={0}
      boxShadow={'0 0 .6rem rgba(0,0,0,0.3)'}
      zIndex={1000}
    >
      <Link href="/">
        <Image
          w={{ base: '140px', lg: '180px' }}
          src={process.env.NEXT_PUBLIC_LOGO}
          alt={process.env.NEXT_PUBLIC_NUME_ZIAR}
        />
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
