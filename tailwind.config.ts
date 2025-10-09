import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        arial: ["Arial", "sans-serif"]
      },
      colors: {
        "cf-dark-gray": "#0F1822",
        "cf-blue": "#042A3D",
        "cf-light-gray": "#CDD4D8",
        "cf-gray": "#808184",
        "cf-burgundy": "#8E1927",
        "brand-dark": "#0F1822",
        "brand-blue": "#042A3D",
        "brand-bordeaux": "#8E1927",
        "brand-gray": "#808184",
        "brand-light": "#CDD4D8"
      }
    }
  },
  plugins: [],
}

export default config
