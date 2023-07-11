/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				primaryLight: 'var(--primary-light)',
				primaryDark: 'var(--primary-dark)',
				complement: 'var(--complement)',
				neutral: 'var(--neutral)',
				opNeutral: 'var(--op-neutral)'
			}
		}
	},
	plugins: []
};
