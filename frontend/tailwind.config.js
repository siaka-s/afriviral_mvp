/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens basés sur les variables CSS définies dans app/globals.css
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        
        // Couleurs AfriViral 2025
        'afriviral-blue': {
          50: 'hsl(var(--afriviral-blue-50))',
          100: 'hsl(var(--afriviral-blue-100))',
          200: 'hsl(var(--afriviral-blue-200))',
          300: 'hsl(var(--afriviral-blue-300))',
          400: 'hsl(var(--afriviral-blue-400))',
          500: 'hsl(var(--afriviral-blue-500))',
          600: 'hsl(var(--afriviral-blue-600))',
          700: 'hsl(var(--afriviral-blue-700))',
          800: 'hsl(var(--afriviral-blue-800))',
          900: 'hsl(var(--afriviral-blue-900))',
          DEFAULT: 'hsl(var(--afriviral-blue))',
        },
        'afriviral-orange': {
          50: 'hsl(var(--afriviral-orange-50))',
          100: 'hsl(var(--afriviral-orange-100))',
          200: 'hsl(var(--afriviral-orange-200))',
          300: 'hsl(var(--afriviral-orange-300))',
          400: 'hsl(var(--afriviral-orange-400))',
          500: 'hsl(var(--afriviral-orange-500))',
          600: 'hsl(var(--afriviral-orange-600))',
          700: 'hsl(var(--afriviral-orange-700))',
          800: 'hsl(var(--afriviral-orange-800))',
          900: 'hsl(var(--afriviral-orange-900))',
          DEFAULT: 'hsl(var(--afriviral-orange))',
        },
        
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2462EA 0%, #ED3F00 100%)',
        'gradient-blue': 'linear-gradient(135deg, #2462EA 0%, #1e52d1 100%)',
        'gradient-orange': 'linear-gradient(135deg, #ED3F00 0%, #d63600 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'blue': '0 10px 25px -5px rgba(36, 98, 234, 0.25)',
        'orange': '0 10px 25px -5px rgba(237, 63, 0, 0.25)',
        'primary': '0 10px 25px -5px rgba(36, 98, 234, 0.25), 0 10px 25px -5px rgba(237, 63, 0, 0.25)',
      },
    },
  },
  plugins: [],
}