import { AboutUs, Auth, Home } from '@/components/screens';

export const ROUTES = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/auth',
    component: Auth,
  },
  {
    path: '/about-us',
    component: AboutUs,
  },
];
