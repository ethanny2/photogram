module.exports = {
	// Manual purge but should be done automatically with NODE_ENV set to production
	// purge: {
	// 	enabled: true,
	// 	content: [
	// 		'./src/**/*.{js,jsx,ts,tsx}',
	// 		'./public/index.html',
	// 		'./src/**/**/*.{js,jsx,ts,tsx}'
	// 	]
	// },
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			xs1: '320px',
			xs2: '425px',
			sm: '640px',
			// => @media (min-width: 640px) { ... }
			md: '768px',
			// => @media (min-width: 768px) { ... }
			lg: '1024px',
			// => @media (min-width: 1024px) { ... }
			xl: '1280px',
			// => @media (min-width: 1280px) { ... }
			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			keyframes: {
				loader: {
					'0%': { transform: 'rotate(0deg)', borderTopColor: '#3498db' },
					'100%': { transform: 'rotate(360deg)', borderTopColor: '#3498db' }
				}
			},
			animation: {
				loader: 'loader 1.5s linear infinite'
			}
		}
	},
	variants: {
		extend: {
			display: ['group-hover']
		}
	},
	plugins: []
};
