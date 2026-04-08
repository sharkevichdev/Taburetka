/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	tabWidth: 4,
	printWidth: 100,
	singleQuote: false,
	plugins: [
		"prettier-plugin-svelte",
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
	tailwindFunctions: ["clsx", "cn", "tv"],
};
