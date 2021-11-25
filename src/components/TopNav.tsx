import NavLink from './NavLink';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { pageRoutes } from '../config/pageRoutes';
import { Button, Flex, Stack, Link, Box } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, createContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

interface TopNavCtxProps {
  toggleResponsiveMenu: Function;
  showMenu: boolean;
}

export const TopNavCtx = createContext<TopNavCtxProps>({
  toggleResponsiveMenu: null,
  showMenu: null,
});

export default function TopNav() {
  const [showMenu, toggleMenu] = useState(false);
  const { user, error, isLoading } = useUser();
  const NavLinks: JSX.Element[] = [];
  const isLoggedIn = typeof user !== 'undefined';
  const borderHoverColor = '2px solid #2A4365';
  const { pathname } = useRouter();

  const logoutProps = {
    href: '/api/auth/logout',
    name: 'Logout',
  };

  const loginProps = {
    href: '/api/auth/login',
    name: 'Login',
  };

  for (const page in pageRoutes) {
    const { href, name } = pageRoutes[page];
    NavLinks.push(<NavLink key={name} href={href} name={name} />);
  }

  function toggleResponsiveMenu(): void {
    toggleMenu(!showMenu);
  }

  return (
    <>
      <TopNavCtx.Provider value={{ toggleResponsiveMenu, showMenu }}>
        <nav className='top-nav'>
          <Flex justifyContent='center'>
            <Flex
              justifyContent='center'
              width='100%'
              maxWidth={600}
              padding={5}
            >
              {/* Desktop Menu */}

              <Stack
                alignItems='center'
                direction='row'
                display={{ base: 'none', sm: 'flex' }}
              >
                {NavLinks}

                {/* signup/login */}
                {
                  <NavLink
                    href={isLoggedIn ? logoutProps.href : loginProps.href}
                    name={isLoggedIn ? logoutProps.name : loginProps.name}
                    auth={true}
                  />
                }

                {/* profile */}
                {isLoggedIn && (
                  <NextLink href='/user/profile' passHref>
                    <Link
                      _hover={{ borderBottom: borderHoverColor }}
                      aria-label='Profile'
                      borderBottom={
                        pathname === '/user/profile' && borderHoverColor
                      }
                    >
                      <Image
                        src='/icon-user.svg'
                        alt='profile'
                        width={30}
                        height={30}
                      />
                    </Link>
                  </NextLink>
                )}
              </Stack>

              {/* Mobile Menu */}
              <Stack
                zIndex={10}
                backgroundColor='gray.100'
                top={0}
                left={0}
                width='100vw'
                height='100vh'
                position='fixed'
                direction='column'
                overflowY='auto'
                display={{ base: showMenu ? 'flex' : 'none', sm: 'none' }}
              >
                <Flex p={6} justify='flex-end'>
                  <Button
                    onClick={toggleResponsiveMenu}
                    leftIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Flex>
                <Stack spacing={6} direction='column' alignItems='center'>
                  {NavLinks}

                  {/* signup/login */}
                  {
                    <NavLink
                      href={isLoggedIn ? logoutProps.href : loginProps.href}
                      name={isLoggedIn ? logoutProps.name : loginProps.name}
                      auth={true}
                    />
                  }

                  {/* profile */}
                  {isLoggedIn && (
                    <NavLink href='/user/profile' name='Profile' />
                  )}
                </Stack>
              </Stack>

              <Button
                p={2}
                display={{ base: 'inline-block', sm: 'none' }}
                leftIcon={<HamburgerIcon />}
                onClick={toggleResponsiveMenu}
              >
                Menu
              </Button>
            </Flex>
          </Flex>
        </nav>
      </TopNavCtx.Provider>
    </>
  );
}
