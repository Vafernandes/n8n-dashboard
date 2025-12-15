/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f1115',
        panel: '#161920',
        accent: '#4f8bff',
        muted: '#8b95a5'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(0,0,0,0.25)',
        'glow': '0 0 0 1px rgba(255,255,255,0.04)',
      }
    }
  },
  plugins: [],
};
