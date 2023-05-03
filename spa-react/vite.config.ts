import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [react()],

    resolve: {
      alias: {
        src: "/src",
        components: "/src/components",
        pages: "/src/pages",
        styles: "/src/styles",
        hooks: "/src/hooks",
        utils: "/src/utils",
        interfaces: "src/interfaces",
        types: "src/types",
      },
    },
  }
})
