import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const target = (env.VITE_API_BASE_URL || "https://mrmusicmack.com/api").replace(/\/+$/, "").replace(/\/api$/, "");
  const proxy = {
    target,
    changeOrigin: true,
    headers: { origin: new URL(target).origin },
    cookieDomainRewrite: "",
    configure(server) {
      server.on("proxyRes", (response) => {
        // Keep production Secure cookies usable through the HTTP localhost proxy.
        if (response.headers["set-cookie"]) {
          response.headers["set-cookie"] = response.headers["set-cookie"].map((cookie) => cookie.replace(/;\s*Secure/gi, ""));
        }
      });
    },
  };
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": proxy,
        "/media": proxy,
      },
    },
  };
});
