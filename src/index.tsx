import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./app-state";
import "./styles/main.scss";
import "./utils/keyboard-intent";
import { Root } from "./root";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("app"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Root />
  </QueryClientProvider>
);
