import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import CharacterList from '../pages/CharacterList';
import CharacterDetail from '../pages/CharacterDetail';

const rootRoute = createRootRoute({
  component: () => <div><Outlet /></div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterList,
  // searchSchema: z.object({
  //   page: z
  //     .preprocess((v) => (typeof v === 'string' ? v : '1'), z.string())
  //     .default('1'),
  // }),
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, characterRoute]);

export const router = createRouter({ routeTree });