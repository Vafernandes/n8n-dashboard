/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#1C1C1C',
        panel: '#2A2A2A',
        accent: '#FF8A8A',
        danger: '#FF8A8A',
        highlight: '#B3B6B8',
        steel: '#8E9194',
        graphite: '#4B4E52',
        muted: '#9A9DA1',
        neutral: '#7A7D80'
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
