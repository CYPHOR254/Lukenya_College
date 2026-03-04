// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
     primary: {
          DEFAULT: '#4a7c2f',
          dark: '#3a6020',
          light: '#5a9c3a',
        },
    },
  },
  plugins: [],
}