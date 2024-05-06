'use client';

import { HStack, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import { useToggle } from './Context';

const MobileNav = ({ navbar }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, toggle } = useToggle();
  return (
    <Stack
      className="mobileNav"
      display={isDesktop ? 'none' : 'flex'}
      w={'350px'}
      top={0}
      transition={'all .8s ease-in-out'}
      right={isOpen ? 0 : '-360px'}
      position={'fixed'}
      zIndex={10001}
      bg={'main'}
      color={'contrast'}
      h={'100vh'}
      px={'2rem'}
      py={'2rem'}
      gap={'1.4rem'}
    >
      <HStack w={'full'} justifyContent={'flex-end'}>
        {' '}
        <CloseIcon color={'contrast'} fontSize={'1.5rem'} onClick={toggle} />
      </HStack>
      {navbar.items.map((item) => (
        <Link onClick={toggle} key={item.name} href={item.link}>
          <Text
            textAlign={'right'}
            fontSize={'1.25rem'}
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
    </Stack>
  );
};

export default MobileNav;
