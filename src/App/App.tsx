import React, { lazy, Suspense } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "react-router-dom";
import Navigation from "@components/Navigation/Navigation";
import { ROUTER_PATHS } from "./constants";
import { Layout } from "@components/index";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Signin = lazy(() => import("../pages/Registration/Registration"));

const App = () => {
  const isAuthorized = Boolean(window.localStorage.getItem("token"));

  const routes = isAuthorized ? (
    <Routes>
      <Route path={ROUTER_PATHS.SIGNIN} element={<Signin />} />
      <Route path={ROUTER_PATHS.HOME_PAGE} element={<HomePage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={ROUTER_PATHS.SIGNIN} element={<Signin />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Layout>
          <Flex direction="column" h="100vh">
            <Navigation />
            <Suspense fallback={<div>Загрузка...</div>}>{routes}</Suspense>
          </Flex>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
