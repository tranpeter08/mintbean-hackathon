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
  // createPoll: {
  //   href: '/create-poll',
  //   name: 'Create Poll',
  // },
  draw: {
    href: '/draw',
    name: 'Draw',
  },
};
