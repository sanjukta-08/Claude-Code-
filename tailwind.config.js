/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // === CANONICAL TOKENS (light theme · orange) ===
        bg:    '#FAFAF7',       // off-white page background
        canvas:'#FFFFFF',       // pure white card surface
        ink: {
          DEFAULT: '#0A0A0A',
          900: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2A2A2A',
          dim: '#6E6E6E',
          ghost: '#A8A8A0',
          fade: '#C8C8C0',
        },
        line: {
          DEFAULT: '#E5E5E0',
          soft: '#EFEFEC',
          strong: '#D0D0CA',
        },
        orange: {
          DEFAULT: '#E85D2A',
          50:  '#FFF1E8',
          100: '#FFE0CC',
          400: '#FF7A4A',
          500: '#E85D2A',
          600: '#C44A1B',
          dim: 'rgba(232,93,42,0.08)',
        },
        sage: '#7AA050',
        ruby: '#D4453B',

        // === LEGACY ALIASES — all point to LIGHT/ORANGE values ===
        midnight: { DEFAULT: '#FAFAF7', 950: '#F0F0EC', 900: '#FAFAF7', 850: '#F8F8F4', 800: '#FFFFFF', 700: '#F5F4F0', 600: '#EFEFEC', 500: '#E5E5E0' },
        snow:     { DEFAULT: '#0A0A0A', 50: '#FFFFFF', 100: '#FAFAF7', 200: '#F0F0EC', 300: '#E5E5E0', dim: '#6E6E6E', ghost: '#A8A8A0', fade: '#C8C8C0' },
        violet:   { DEFAULT: '#E85D2A', 50: '#FFF1E8', 100: '#FFE0CC', 200: '#FFCDAC', 300: '#FF9F73', 400: '#FF7A4A', 500: '#E85D2A', 600: '#C44A1B', 700: '#A03A12', dim: 'rgba(232,93,42,0.08)' },
        mint:     { DEFAULT: '#7AA050', dim: 'rgba(122,160,80,0.10)' },
        rose:     { DEFAULT: '#D4453B', dim: 'rgba(212,69,59,0.10)' },
        amber:    { DEFAULT: '#D08A1A', dim: 'rgba(208,138,26,0.10)' },

        ink_alt:  { DEFAULT: '#0A0B12', 950: '#06070E', 900: '#0A0A0A', 850: '#1A1A1A', 800: '#FFFFFF', 700: '#F5F4F0', 600: '#EFEFEC', 500: '#E5E5E0' },
        bone:     { DEFAULT: '#0A0A0A', 50: '#FAFAF7', 100: '#F5F4F0', 200: '#EFEFEC', 300: '#E5E5E0', dim: '#6E6E6E', ghost: '#A8A8A0', fade: '#C8C8C0' },
        gold:     { DEFAULT: '#E85D2A', 50: '#FFF1E8', 100: '#FFE0CC', 400: '#FF7A4A', 500: '#E85D2A', 600: '#C44A1B', dim: '#A03A12', glow: '#FF9F73' },
        paper:    { DEFAULT: '#FFFFFF', 50: '#FAFAF7', 100: '#FFFFFF', 200: '#F5F4F0', 300: '#EFEFEC' },
        cream:    '#F5F4F0',
        noir:     { DEFAULT: '#0A0A0A', 900: '#000000', 800: '#0A0A0A', 700: '#1A1A1A' },
        coffee:   { DEFAULT: '#6E6E6E', dim: '#A8A8A0', ghost: '#C8C8C0', fade: '#DCDCD6' },
        crimson:  { DEFAULT: '#E85D2A', 50: '#FFF1E8', 100: '#FFE0CC', 400: '#FF7A4A', 500: '#E85D2A', 600: '#C44A1B', dim: 'rgba(232,93,42,0.08)' },
        moss:     { DEFAULT: '#7AA050', 50: '#F1F5EC', dim: 'rgba(122,160,80,0.10)' },
        brass:    '#E85D2A',
        signal: {
          green: '#7AA050', 'green-dim': 'rgba(122,160,80,0.10)',
          red:   '#D4453B', 'red-dim':   'rgba(212,69,59,0.10)',
          blue:  '#E85D2A', 'blue-dim':  'rgba(232,93,42,0.10)',
          amber: '#D08A1A',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        // legacy aliases
        serif: ['Inter', 'system-ui', 'sans-serif'],
        head:  ['Inter', 'system-ui', 'sans-serif'],
        body:  ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em', tighter: '-0.025em', tight: '-0.015em',
        wide2: '0.06em', wide3: '0.10em', wide4: '0.16em',
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        'card':      '0 1px 0 0 rgba(0,0,0,0.02), 0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.06)',
        'elev':      '0 1px 0 0 rgba(0,0,0,0.02), 0 2px 6px 0 rgba(0,0,0,0.06), 0 16px 32px -8px rgba(0,0,0,0.10)',
        'orange-sm': '0 0 0 1px rgba(232,93,42,0.30), 0 0 0 4px rgba(232,93,42,0.08)',

        // legacy
        'panel':     '0 1px 0 0 rgba(0,0,0,0.02), 0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.06)',
        'paper':     '0 1px 0 0 rgba(0,0,0,0.02), 0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.06)',
        'paper-lg':  '0 1px 0 0 rgba(0,0,0,0.02), 0 2px 6px 0 rgba(0,0,0,0.06), 0 16px 32px -8px rgba(0,0,0,0.10)',
        'violet':    '0 0 0 1px rgba(232,93,42,0.30), 0 0 0 4px rgba(232,93,42,0.08)',
        'violet-sm': '0 0 0 1px rgba(232,93,42,0.30), 0 0 0 4px rgba(232,93,42,0.08)',
        'gold-glow': '0 0 0 1px rgba(232,93,42,0.30), 0 0 0 4px rgba(232,93,42,0.08)',
        'seal':      '0 4px 16px rgba(232,93,42,0.30)',
      },
      animation: {
        'caret': 'caret 1s steps(1) infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'shimmer': 'shimmer 3s linear infinite',
        'aurora': 'pulseSoft 6s ease-in-out infinite',
      },
      keyframes: {
        caret: { '0%, 50%': { opacity: '1' }, '50.01%, 100%': { opacity: '0' } },
        pulseSoft: { '0%, 100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
