import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import flowbite from 'flowbite/plugin'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui, flowbite],
  daisyui: {
    themes: ["garden", "synthwave"],
  },
} as unknown as Config

export default config 