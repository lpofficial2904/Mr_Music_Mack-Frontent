import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");
const app = (
  <HelmetProvider>
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <App />
    </BrowserRouter>
    <Toaster
      position="top-center"
      containerStyle={{ zIndex: 10000 }}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#111820",
          color: "#f7f3e9",
          border: "1px solid rgba(217, 177, 82, 0.55)",
          borderRadius: "14px",
          padding: "14px 18px",
          fontFamily: "inherit",
        },
        success: {
          iconTheme: { primary: "#d9b152", secondary: "#111820" },
        },
        error: {
          iconTheme: { primary: "#ff756b", secondary: "#111820" },
        },
      }}
    />
  </HelmetProvider>
);

if (root.hasChildNodes() && !window.location.search) {
  hydrateRoot(root, app);
} else {
  document.querySelector('meta[name="description"]')?.remove();
  document.querySelector("title")?.remove();
  createRoot(root).render(app);
}
