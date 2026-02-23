/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                // CHANGED: Background is now white
                background: '#ffffff',
                // CHANGED: Primary is now a crisp Blue
                primary: {
                    DEFAULT: '#3b82f6',
                    hover: '#2563eb',
                },
                // UPDATED: Modern Violet/Blue palette
                accent: {
                    violet: '#8b5cf6',
                    blue: '#60a5fa',
                    slate: '#f8fafc', // Great for light card backgrounds
                }
            },
            boxShadow: {
                // UPDATED: Subtle shadow for white theme (not the heavy dark glass)
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'border': '0 0 0 1px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}