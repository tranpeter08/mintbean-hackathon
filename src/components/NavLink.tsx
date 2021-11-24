import NextLink from 'next/link';
import {Link, ListItem, Box} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {MouseEventHandler} from 'react';

interface NavLinkProps {
  href: string;
  name: string;
  className?: string;
  onClick?: MouseEventHandler;
}

export default function NavLink({
  href,
  name,
  className,
  onClick,
}: NavLinkProps) {
  let anchorClassName = typeof className === 'string' ? className : '';
  const router = useRouter();
  const {pathname} = router;
  const isActive = pathname === href;

  return (
    <Box p={3}>
      <NextLink href={href} passHref>
        <Link
          onClick={onClick}
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
