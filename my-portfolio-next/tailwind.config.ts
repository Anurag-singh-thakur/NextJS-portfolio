   /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' 
          }
        }
      }
    },
  },
  plugins: [],
};