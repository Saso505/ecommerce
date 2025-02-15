const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", "flowbite//*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-white': '0 5px 10px rgba(255, 255, 255, 0.5)',
      },
      fontFamily: {
        main: ["Playfair Display", 'serif'],
        lato:[   "Lato", 'serif']
      },
      
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}