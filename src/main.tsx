import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import App from "./App";

console.log(
  "%c Built by Karabo Hlabangane ",
  "background: #0a0a0a; color: #c9a84c; font-size: 12px; font-weight: bold; padding: 6px 12px; border-left: 3px solid #c9a84c;"
);

/**
 * React/Vite entry point. Keeps bootstrapping minimal so architecture stays
 * discoverable in App.tsx and route-level modules.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);