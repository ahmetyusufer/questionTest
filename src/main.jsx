import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";

import { QuizContextProvider } from "./contexts/QuizContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuizContextProvider>
        <App />
      </QuizContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
