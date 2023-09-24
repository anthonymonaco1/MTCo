import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'button': ['10px', '14px']
      },
      animation: {
        'shine-slide': 'shine-slide 2s infinite',
      },
      keyframes: {
        'shine-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(125%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
