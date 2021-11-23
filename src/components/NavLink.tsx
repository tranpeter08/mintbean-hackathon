import NextLink from 'next/link';
import {Link, ListItem, Box} from '@chakra-ui/react';
import {useRouter} from 'next/router';

interface NavLinkProps {
  href: string;
  name: string;
  className?: string;
}

export default function NavLink({href, name, className}: NavLinkProps) {
  let anchorClassName = typeof className === 'string' ? className : '';
  const router = useRouter();
  const {pathname} = router;
  const isActive = pathname === href;

  return (
    <Box pl={5}>
      <NextLink href={href} passHref>
        <Link
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
