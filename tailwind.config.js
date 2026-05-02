/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./index.html',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				void: '#0a0a0f',
				neural: '#12121a',
				circuit: '#1a1a24',
				'indigo': '#6366f1',
				'purple': '#8b5cf6',
				'cyan': '#06b6d4',
				'green': '#22c55e',
				'orange': '#f59e0b',
				'text-primary': '#f1f5f9',
				'text-secondary': '#94a3b8',
				'text-muted': '#64748b',
				'border-light': '#1e293b',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Space Grotesk', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fadeIn 0.5s ease-out',
				'fade-in-up': 'fadeInUp 0.6s ease-out',
				'slide-in': 'slideIn 0.5s ease-out',
				'gradient': 'gradient 8s ease infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				glow: {
					'0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.5)' },
					'100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideIn: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				gradient: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
