import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");
const app = (
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <App />
  </BrowserRouter>
);

if (root.hasChildNodes() && !window.location.search) {
  hydrateRoot(root, app);
} else {
  document.querySelector('meta[name="description"]')?.remove();
  document.querySelector("title")?.remove();
  createRoot(root).render(app);
}
