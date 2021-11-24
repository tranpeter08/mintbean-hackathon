import NavLink from './NavLink';
import NextLink from 'next/link';
import {pageRoutes} from '../config/pageRoutes';
import {
  IconButton,
  Button,
  Box,
  List,
  Flex,
  Spacer,
  Stack,
  useColorMode,
  Switch,
  CloseButton,
} from '@chakra-ui/react';
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import {useState} from 'react';

export default function TopNav() {
  const [showMenu, toggleMenu] = useState(false);
  const NavLinks: JSX.Element[] = [];

  for (const page in pageRoutes) {
    const {href, name} = pageRoutes[page];
    NavLinks.push(
      <NavLink
        onClick={showMenu && toggleResponsiveMenu}
        key={name}
        href={href}
        name={name}
      />
    );
  }

  function toggleResponsiveMenu() {
    toggleMenu(!showMenu);
  }

  return (
    <>
      <nav className="top-nav">
        <Flex justifyContent="center">
          <Flex justifyContent="center" width="100%" maxWidth={600} padding={5}>
            {/* Desktop Menu */}

            <Stack
              alignItems="center"
              direction="row"
              display={{base: 'none', sm: 'flex'}}
            >
              {NavLinks}
            </Stack>

            {/* Mobile Menu */}
            <Stack
              zIndex={10}
              backgroundColor="gray.100"
              top={0}
              left={0}
              width="100vw"
              height="100vh"
              position="fixed"
              direction="column"
              overflowY="auto"
              display={{base: showMenu ? 'flex' : 'none', sm: 'none'}}
            >
              <Flex p={6} justify="flex-end">
                <Button onClick={toggleResponsiveMenu} leftIcon={<CloseIcon />}>
                  Close
                </Button>
              </Flex>
              <Stack spacing={6} direction="column" alignItems="center">
                {NavLinks}
              </Stack>
            </Stack>

            <Button
              p={2}
              display={{base: 'inline-block', sm: 'none'}}
              leftIcon={<HamburgerIcon />}
              onClick={toggleResponsiveMenu}
            >
              Menu
            </Button>
          </Flex>
        </Flex>
      </nav>
    </>
  );
}
