/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0E1A',
          950: '#070A14',
          900: '#0A0E1A',  // base bg
          850: '#0D1220',  // app bg
          800: '#0F1424',  // surface 1 (inset)
          700: '#131A2E',  // surface 2 (cards)
          600: '#1A2240',  // elevated
          500: '#242D52',  // top elevation
        },
        bone: {
          DEFAULT: '#F5F7FF',
          50:  '#FAFBFF',
          100: '#F5F7FF',
          200: '#E4E8F5',
          300: '#C4CCE2',
          dim: '#8B96B5',
          ghost: '#5C6488',
          fade: '#3A4263',
        },
        gold: {
          DEFAULT: '#FFC53D',
          50:  '#FFF8E1',
          100: '#FFE08A',
          400: '#FFD466',
          500: '#FFC53D',
          600: '#E5A819',
          dim: '#B8860B',
          glow: '#FFE08A',
        },
        signal: {
          green: '#3DDC97',
          'green-dim': 'rgba(61,220,151,0.12)',
          red: '#FF6B6B',
          'red-dim': 'rgba(255,107,107,0.12)',
          blue: '#5B9CFF',
          'blue-dim': 'rgba(91,156,255,0.12)',
          amber: '#FFB13D',
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
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'panel': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.4)',
        'elev':  '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 16px 40px -16px rgba(0,0,0,0.6)',
        'gold-glow': '0 0 0 1px rgba(255,197,61,0.4), 0 0 48px -8px rgba(255,197,61,0.4)',
      },
      animation: {
        'caret': 'caret 1s steps(1) infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'scan': 'scan 6s linear infinite',
        'sheen': 'sheen 2s linear infinite',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.22,1,0.36,1) both',
      },
      keyframes: {
        caret: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        sheen: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
