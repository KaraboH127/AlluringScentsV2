import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import App from "./App";

/**
 * React/Vite entry point. Keeps bootstrapping minimal so architecture stays
 * discoverable in App.tsx and route-level modules.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
