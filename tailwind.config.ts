import scrollbar from "tailwind-scrollbar";
import scrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';
import { colors, fontSize, screens } from './lib/app-config';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        brandcore: {
          P1: '#0C3932',
          P2: '#00303C',
          vibrantgreen: '#0CAE5C',
          palegreen: '#77FF9E',
          paleblue: '#77E4FF',
          darkblue: '#079ABF',
        },
      },
      screens: screens,
      fontSize: fontSize,
      fontFamily: {
        twk: ['var(--font-twk)', 'sans-serif'],
      },
      backgroundImage: {
        'describe-box-gradient':
          'linear-gradient(154.56deg, rgba(122, 95, 234, 0.4) -17.86%, #FFFFFF 102.13%)',
        'auth-background': "url('../public/assets/svg/auth-background.svg')",
      },
      animation: {
        slide: 'slide 5s linear infinite', // Define custom animation
        circle: 'circle 4s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        circle: {
          '0%': { transform: 'rotate(0deg) translateX(30px) rotate(0deg)' },
          '100%': {
            transform: 'rotate(360deg) translateX(30px) rotate(-360deg)',
          },
        },
      },
    },
  },
  plugins: [scrollbarHide,scrollbar],
} satisfies Config;
