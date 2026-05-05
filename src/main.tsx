import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./ui/styles/tokens.css";
import "./ui/styles/global.css";
import "./ui/styles/layout.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
