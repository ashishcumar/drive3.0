import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import MetaMaskErr from "./components/MetaMaskErr.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback={<MetaMaskErr />}>
    <ChakraProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </ErrorBoundary>
);
