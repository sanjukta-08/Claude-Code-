/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0E1A',
          900: '#070A14',
          800: '#0A0E1A',
          700: '#11172A',
          600: '#1A2240',
          500: '#2A3358',
        },
        bone: {
          DEFAULT: '#E8EAF2',
          dim: '#A8B0C8',
          ghost: '#5C6488',
        },
        gold: {
          DEFAULT: '#FFC53D',
          dim: '#B8860B',
          glow: '#FFE08A',
        },
        signal: {
          green: '#3DDC97',
          red: '#FF6B6B',
          blue: '#5B9CFF',
        },
      },
      fontFamily: {
        head: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        wide2: '0.08em',
        wide3: '0.14em',
        wide4: '0.22em',
      },
      animation: {
        'caret': 'caret 1s steps(1) infinite',
        'pulse-rec': 'pulseRec 1.6s ease-in-out infinite',
        'scan': 'scan 6s linear infinite',
        'drift': 'drift 18s ease-in-out infinite',
      },
      keyframes: {
        caret: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        pulseRec: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(2%, -1%)' },
        },
      },
    },
  },
  plugins: [],
}
