import { defineConfig } from "vite"
import { sveltekit } from "@sveltejs/kit/vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		cssMinify: "lightningcss",
		minify: "esbuild",
	},
	clearScreen: false,
	server: {
		port: 80,
		strictPort: true,
	},
})
