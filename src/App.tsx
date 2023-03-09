import {
  ColorSchemeProvider,
  MantineProvider,
  useMantineColorScheme,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { ClientsPage } from "./pages/ClientsPage";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  const colorScheme = useColorScheme();
  return (
    <MantineProvider
      theme={{ colorScheme }}
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/clients" element={<ClientsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};
