/** @type {import('tailwindcss').Config} */
export default {
    content: ['./app.vue', './components/**/*.{vue,js,ts}', './pages/**/*.vue'],
    theme: {
        extend: {
            colors: {
                brand: {
                    // Updated brand scale centered on #438ca4
                    50: '#f3f8f9',
                    100: '#e6f1f3',
                    200: '#cfe3e8',
                    300: '#9fcbd3',
                    400: '#66aebf',
                    500: '#438ca4', // new primary brand blue
                    600: '#377686',
                    700: '#2b5d66',
                    800: '#234952',
                    900: '#18363e'
                }
            },
            boxShadow: {
                glass: '0 10px 30px rgba(23,37,84,0.10)'
            }
        }
    },
    plugins: []
}
