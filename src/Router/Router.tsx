import React, { lazy } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTER_PATHS } from "./routerPaths";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Signin = lazy(() => import("../pages/Registration/Registration"));

type Props = {
  isAuthorized: boolean;
};

const Router = ({ isAuthorized }: Props) => {
  return (
    <>
      {isAuthorized ? (
        <Routes>
          <Route path={ROUTER_PATHS.REGISTRATION} element={<Signin />} />
          <Route path={ROUTER_PATHS.HOME_PAGE} element={<HomePage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={ROUTER_PATHS.REGISTRATION} element={<Signin />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      )}
    </>
  );
};

export default Router;
