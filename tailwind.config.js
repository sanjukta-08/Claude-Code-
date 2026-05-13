/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // === DARK MODE (app/admin) — kept ===
        ink: {
          DEFAULT: '#0A0E1A',
          950: '#070A14', 900: '#0A0E1A', 850: '#0D1220', 800: '#0F1424',
          700: '#131A2E', 600: '#1A2240', 500: '#242D52',
        },
        bone: {
          DEFAULT: '#F5F7FF', 50: '#FAFBFF', 100: '#F5F7FF',
          200: '#E4E8F5', 300: '#C4CCE2',
          dim: '#8B96B5', ghost: '#5C6488', fade: '#3A4263',
        },
        gold: {
          DEFAULT: '#FFC53D', 50: '#FFF8E1', 100: '#FFE08A',
          400: '#FFD466', 500: '#FFC53D', 600: '#E5A819',
          dim: '#B8860B', glow: '#FFE08A',
        },
        signal: {
          green: '#3DDC97', 'green-dim': 'rgba(61,220,151,0.12)',
          red: '#FF6B6B', 'red-dim': 'rgba(255,107,107,0.12)',
          blue: '#5B9CFF', 'blue-dim': 'rgba(91,156,255,0.12)',
          amber: '#FFB13D',
        },

        // === LIGHT MODE (marketing) — editorial / paper ===
        paper: {
          DEFAULT: '#F4ECD8',   // parchment
          50:  '#FAF5E8',
          100: '#F4ECD8',
          200: '#EBE0C5',
          300: '#DDD0AC',
        },
        cream: '#FAF5E8',
        noir: {
          DEFAULT: '#1C1812',
          900: '#0F0C08',
          800: '#1C1812',
          700: '#2A241B',
        },
        coffee: {
          DEFAULT: '#5C4F3F',
          dim:   '#857560',
          ghost: '#A89A82',
          fade:  '#C9BDA6',
        },
        crimson: {
          DEFAULT: '#C53030',
          50:  '#FCE9E9',
          100: '#F8D0D0',
          400: '#D94A4A',
          500: '#C53030',
          600: '#9B2424',
          dim: 'rgba(197,48,48,0.10)',
        },
        moss: {
          DEFAULT: '#2F6B5A',
          50: '#E7F0EC',
          dim: 'rgba(47,107,90,0.10)',
        },
        brass: '#B8860B',
      },
      fontFamily: {
        // Editorial (marketing)
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans:  ['Geist', 'system-ui', 'sans-serif'],
        // Existing (app)
        head: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em', tighter: '-0.02em',
        wide2: '0.08em', wide3: '0.14em', wide4: '0.22em',
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        'panel':     '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.4)',
        'elev':      '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 16px 40px -16px rgba(0,0,0,0.6)',
        'gold-glow': '0 0 0 1px rgba(255,197,61,0.4), 0 0 48px -8px rgba(255,197,61,0.4)',
        'paper':     '0 1px 0 0 rgba(255,255,255,0.5) inset, 0 1px 2px 0 rgba(28,24,18,0.06), 0 8px 28px -10px rgba(28,24,18,0.10)',
        'paper-lg':  '0 1px 0 0 rgba(255,255,255,0.5) inset, 0 4px 12px -2px rgba(28,24,18,0.08), 0 24px 48px -16px rgba(28,24,18,0.18)',
        'seal':      '0 4px 12px rgba(197,48,48,0.30), 0 2px 4px rgba(197,48,48,0.20), inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -2px 4px rgba(0,0,0,0.20)',
      },
      animation: {
        'caret': 'caret 1s steps(1) infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'scan': 'scan 6s linear infinite',
        'sheen': 'sheen 2s linear infinite',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'drift-up': 'driftUp 16s linear infinite',
      },
      keyframes: {
        caret: { '0%, 50%': { opacity: '1' }, '50.01%, 100%': { opacity: '0' } },
        pulseSoft: { '0%, 100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        sheen: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        driftUp: {
          '0%':   { transform: 'translate(0, 0) rotate(0deg)',     opacity: '0' },
          '10%':  { opacity: '0.6' },
          '90%':  { opacity: '0.6' },
          '100%': { transform: 'translate(20px, -120vh) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
