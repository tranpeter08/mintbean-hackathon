import NextLink from 'next/link';
import { Link, ListItem, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TopNavCtx } from './TopNav';
import { useContext } from 'react';

interface NavLinkProps {
  href: string;
  name: string;
  className?: string;
  auth?: boolean;
}

export default function NavLink({
  href,
  name,
  className,
  auth = false,
}: NavLinkProps) {
  let anchorClassName = typeof className === 'string' ? className : '';
  const router = useRouter();
  const { pathname } = router;
  const isActive = pathname === href;
  const { showMenu, toggleResponsiveMenu } = useContext(TopNavCtx);

  function handleClick() {
    if (showMenu) {
      toggleResponsiveMenu();
    }
  }

  if (auth)
    return (
      <Box p={3}>
        <Link
          href={href}
          onClick={handleClick}
          fontSize={18}
          fontWeight={isActive ? 700 : 500}
          color={isActive ? 'blue.700' : 'black'}
          className={anchorClassName}
        >
          {name}
        </Link>
      </Box>
    );

  return (
    <Box p={3}>
      <NextLink href={href} passHref>
        <Link
          onClick={handleClick}
          fontSize={18}
          fontWeight={isActive ? 700 : 500}
          color={isActive ? 'blue.700' : 'black'}
          className={anchorClassName}
        >
          {name}
        </Link>
      </NextLink>
    </Box>
  );
}
