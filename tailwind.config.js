/** @type {import('tailwindcss').Config} */
export default {
    content: ['./app.vue', './components/**/*.{vue,js,ts}', './pages/**/*.vue'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eef7ff',
                    100: '#d9edff',
                    200: '#b6dbff',
                    300: '#86c2ff',
                    400: '#4fa1ff',
                    500: '#2f86ff',     // primary blue (fun but professional)
                    600: '#2267d6',
                    700: '#1e53ab',
                    800: '#1f4989',
                    900: '#1e3e6e'
                }
            },
            boxShadow: {
                glass: '0 10px 30px rgba(23,37,84,0.10)'
            }
        }
    },
    plugins: []
}
