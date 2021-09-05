import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [isProd && legacy({ targets: ["defaults", "not IE 11"] })],
  // server: {
  //   proxy: {
  //     "/test-proxy": {
  //       target: "http://127.0.0.1:4080",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
