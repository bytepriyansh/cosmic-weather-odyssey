
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cosmic: {
					'blue': '#121420',
					'purple': '#7A04EB',
					'cyan': '#0FF0FC',
					'magenta': '#FF00A0',
					'indigo': '#3A0CA3',
					'violet': '#9b87f5'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'sans-serif'],
				'exo': ['Exo 2', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1', filter: 'brightness(1)' },
					'50%': { opacity: '0.8', filter: 'brightness(1.5)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'meteor': {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
					'70%': { opacity: '1' },
					'100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				},
				'tilt': {
					'0%, 100%': { transform: 'perspective(500px) rotateX(0) rotateY(0)' },
					'25%': { transform: 'perspective(500px) rotateX(2deg) rotateY(1deg)' },
					'75%': { transform: 'perspective(500px) rotateX(-2deg) rotateY(-1deg)' },
				},
				'rain': {
					'0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(20px) translateX(-5px)', opacity: '0' }
				},
				'number-change': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0%)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'spin-slow': 'spin-slow 12s linear infinite',
				'meteor': 'meteor 5s linear infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-left': 'slide-left 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
				'ripple': 'ripple 1s ease-out forwards',
				'tilt': 'tilt 10s ease-in-out infinite',
				'rain': 'rain 1.5s linear infinite',
				'number-change': 'number-change 0.4s ease-out'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)'
			},
			boxShadow: {
				'neon-cyan': '0 0 5px theme("colors.cosmic.cyan"), 0 0 20px theme("colors.cosmic.cyan")',
				'neon-magenta': '0 0 5px theme("colors.cosmic.magenta"), 0 0 20px theme("colors.cosmic.magenta")',
				'neon-purple': '0 0 5px theme("colors.cosmic.purple"), 0 0 20px theme("colors.cosmic.purple")',
				'neon-violet': '0 0 5px theme("colors.cosmic.violet"), 0 0 20px theme("colors.cosmic.violet")',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
