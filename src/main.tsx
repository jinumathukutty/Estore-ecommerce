import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./localization/i18n.ts";

import { registerSW } from "virtual:pwa-register";

registerSW({
  onOfflineReady() {
    console.log("App is ready to work offline");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
