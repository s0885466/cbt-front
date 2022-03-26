import React, { Suspense } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "@components/Navigation/Navigation";
import { Layout } from "@components/index";
import Router from "@src/Router/Router";
import { AuthContext } from "@src/contexts/AuthContext";
import { useAuth } from "@src/hooks/useAuth";

const App = () => {
  const { login, logout, isAuthorized, isLoading } = useAuth();

  return (
    <AuthContext.Provider value={{ login, logout, isAuthorized }}>
      <ChakraProvider>
        <BrowserRouter>
          <Layout>
            <Flex direction="column" h="100vh">
              <Navigation />
              <Suspense fallback={<div>Загрузка...</div>}>
                {isLoading ? (
                  <div>Загрузка...</div>
                ) : (
                  <Router isAuthorized={isAuthorized} />
                )}
              </Suspense>
            </Flex>
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </AuthContext.Provider>
  );
};

export default App;
