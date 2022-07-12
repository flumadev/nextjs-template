import React from 'react';
import {
  ChevronDownIcon,
  DashboardIcon,
  GearIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import {
  Container,
  VStack,
  Heading,
  styled,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

const NavigationItem = styled(Flex, {
  baseStyle: {
    border: '1px solid #00000000',
    borderRadius: 4,
    alignItems: 'center',
    w: '100%',
    p: 2,
    transition: 'all .1s',
    _hover: {
      bgColor: 'rgba(255, 255, 255, 1)',
    },
  },
});

const SideMenu = () => {
  const route = useRouter();

  function signOut() {
    destroyCookie(null, 'fluma-whms:token');
    route.push('/');
  }
  return (
    <VStack
      height={'100vh'}
      alignItems={'flex-start'}
      padding={8}
      bgColor={'purple.50'}
    >
      <Heading mb={8}> Fluma</Heading>
      <Flex
        w={'100%'}
        h={'100%'}
        flexDir={'column'}
        justifyContent={'space-between'}
      >
        <VStack w={'100%'}>
          <NextLink href={'/dashboard'}>
            <NavigationItem>
              <DashboardIcon style={{ marginRight: 16 }} /> Dashboard
            </NavigationItem>
          </NextLink>
        </VStack>

        <Menu>
          <MenuButton as={Button} leftIcon={<GearIcon />} borderRadius={16}>
            Settings
          </MenuButton>
          <MenuList>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem onClick={signOut}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </VStack>
  );
};

export default SideMenu;
