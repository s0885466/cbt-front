import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { ROUTER_PATHS } from "./constants";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Signin = lazy(() => import("../pages/Signin/Signin"));

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
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<div>Загрузка...</div>}>{routes}</Suspense>
    </BrowserRouter>
  );
};

export default App;
