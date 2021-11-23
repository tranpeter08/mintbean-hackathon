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
} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';
import {useState} from 'react';

export default function TopNav() {
  const [showMenu, toggleMenu] = useState(false);
  const NavLinks: JSX.Element[] = [];

  for (const page in pageRoutes) {
    const {href, name} = pageRoutes[page];
    NavLinks.push(<NavLink key={name} href={href} name={name} />);
  }

  function toggleResponsiveMenu() {
    toggleMenu(!showMenu);
  }

  return (
    <>
      <nav className="top-nav">
        <Flex justifyContent="center">
          <Flex width="100%" maxWidth={600} padding={5}>
            <Box>
              <NextLink href="/">
                <a>Logo</a>
              </NextLink>
            </Box>

            <Spacer />

            <Stack alignItems="center" direction={{base: 'column', md: 'row'}}>
              {NavLinks}
            </Stack>

            {/* <Button
            p={2}
            display={{base: 'inline-block', md: 'none'}}
            leftIcon={<HamburgerIcon />}
            onClick={toggleResponsiveMenu}
          >
            Menu
          </Button> */}
          </Flex>
        </Flex>
      </nav>
    </>
  );
}
