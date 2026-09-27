import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/feedback/ErrorBoundary.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/tanstack-query/client.ts";

import "./styles/index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./app/providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
