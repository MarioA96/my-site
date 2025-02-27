import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,astro}", "./pages/**/*.{js,jsx,ts,tsx,astro}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        xsm: '470px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      tokens: {
        fonts: {
          ubuntu_bold: { value: 'var(--font-ubuntu-bold), sans-serif' },
          ubuntu_bold_italic: { value: 'var(--font-ubuntu-bold-italic), sans-serif' },
          ubuntu_italic: { value: 'var(--font-ubuntu-italic), sans-serif' },
          ubuntu_light: { value: 'var(--font-ubuntu-light), sans-serif' },
          ubuntu_light_italic: { value: 'var(--font-ubuntu-italic), sans-serif' },
          ubuntu_medium: { value: 'var(--font-ubuntu-medium), sans-serif' },
          ubuntu_medium_italic: { value: 'var(--font-ubuntu-medium-italic), sans-serif' },
          ubuntu_regular: { value: 'var(--font-ubuntu-regular), sans-serif' },
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
