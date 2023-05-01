import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [react()],

    resolve: {
      alias: {
        components: "/src/components",
        styles: "/src/styles",
        pages: "/src/pages",
        hooks: "/src/hooks",
        asstes: "src/assets",
        utils: "/src/utils",
        interfaces: "src/interfaces",
        types: "src/types",
      },
    },
  }
})
