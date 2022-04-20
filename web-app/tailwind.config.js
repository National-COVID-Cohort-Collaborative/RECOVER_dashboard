// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        colors:{
            ...colors,
            theme1: {
              DEFAULT: '#003f5c',
            },
            theme2: {
              DEFAULT: '#444e86',
            },
            theme3: {
              DEFAULT: '#955196',
            },
            theme4: {
              DEFAULT: '#dd5181',
            },
            theme5: {
              DEFAULT: '#ff6e54',
            },
            theme6: {
              DEFAULT: '#ffa601',
            },
        },
        extend: {
          display: ["group-hover"],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
}
