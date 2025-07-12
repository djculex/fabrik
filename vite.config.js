import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  publicDir: 'public',
  server: {
    port: 8080,
    open: true,
  },
});
