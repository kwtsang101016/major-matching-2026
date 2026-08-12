import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/major-matching-2026/",
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: false,
  },
});
