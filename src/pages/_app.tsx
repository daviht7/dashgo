import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContext";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import { makeServer } from "../services/mirage/index";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}
