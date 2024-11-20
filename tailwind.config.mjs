/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  colors: {
			background: '#000000',
		  },
		  fontFamily: {
			sans: ['Nunito', 'sans-serif'],
		  },
		},
	},
	plugins: [],
}