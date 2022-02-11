import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "react-router-dom";

const Main = () => (
  <div>
    <Link to={"/users/hello"}>link</Link>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="users">
          <Route path="me" element={<div>me</div>} />
          <Route path=":id" element={<div>user id</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
