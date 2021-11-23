interface PageData {
  href: string;
  name: string;
}

interface PageRoutes {
  [key: string]: PageData;
}

export const pageRoutes: PageRoutes = {
  home: {
    href: '/',
    name: 'Home',
  },
  draw: {
    href: '/draw',
    name: 'Draw',
  },
};
