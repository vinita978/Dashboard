import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: "0.0.0.0",   // 👈 allow phone access
    port: 5173,
    strictPort: true
  }
})
