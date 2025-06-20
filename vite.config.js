// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        // target: "http://97.74.87.147:5000",
        changeOrigin: true,
        secure: false,
      },
      "/images": {
        target: "http://localhost:5000",
        // target: "http://97.74.87.147:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
