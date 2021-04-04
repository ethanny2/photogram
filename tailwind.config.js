module.exports = {
	// Manual purge but should be done automatically with NODE_ENV set to production
	purge: {
		// enabled: true,
		content: [
			'./src/**/*.{js,jsx,ts,tsx}',
			'./public/index.html',
			'./src/**/**/*.{js,jsx,ts,tsx}'
		]
	},
	// purge: [
	// 	'./src/**/*.{js,jsx,ts,tsx}',
	// 	'./public/index.html',
	// 	'./src/**/**/*.{js,jsx,ts,tsx}'
	// ],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {}
	},
	variants: {
		extend: {
			display: ['group-hover']
		}
	},
	plugins: []
};
