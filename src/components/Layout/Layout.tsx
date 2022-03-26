import React from "react";
import { Container, theme } from "@chakra-ui/react";

const Layout: React.FC = ({ children }) => {
  return <Container maxW={theme.sizes.container.xl}>{children}</Container>;
};

export default Layout;
