import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project site lives at https://<user>.github.io/kavk-kedvtelesi/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/kavk-kedvtelesi/" : "/",
  plugins: [react()],
  server: { host: true },
}));
