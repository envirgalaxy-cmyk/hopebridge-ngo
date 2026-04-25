import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import About from "./pages/About";
import CauseDetail from "./pages/CauseDetail";
import Causes from "./pages/Causes";
import Contact from "./pages/Contact";
import Donations from "./pages/Donations";
import Home from "./pages/Home";
import Volunteers from "./pages/Volunteers";

const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const causesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/causes",
  component: Causes,
});
const causeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/causes/$id",
  component: CauseDetail,
});
const donationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donations",
  component: Donations,
});
const volunteersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volunteers",
  component: Volunteers,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  causesRoute,
  causeDetailRoute,
  donationsRoute,
  volunteersRoute,
  aboutRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
