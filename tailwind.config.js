import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import { addIconSelectors, addDynamicIconSelectors } from '@iconify/tailwind'
import colors from 'tailwindcss/colors'

function generateLen(n) {
  return Array.from({length: 12}, (_, i) => i + 1).join('|')
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [
    {
      pattern: new RegExp(`grid-cols-(none|subgrid|${generateLen(12)})`)
    },
    {
      pattern: new RegExp(`col-(span|start|end)-(${generateLen(12)}|auto)`)
    },
    {
      pattern: new RegExp(`gap-(${generateLen(12)})`)
    },
    {
      pattern: new RegExp(`gap-(x|y)-(${generateLen(12)})`)
    }
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.yellow['400'],
        success: colors.green['400'],
        danger: colors.red['400'],
        info: colors.slate['400'],
        warning: colors.orange['400']
      }
    }
  },

  plugins: [
    typography,
    // Iconify plugin, requires writing list of icon sets to load
    addIconSelectors(['mdi', 'mdi-light']),
    addDynamicIconSelectors(),
    plugin(function ({ addVariant, matchUtilities, theme }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      // Square utility
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value
          })
        },
        { values: theme('spacing') }
      )
    })
  ]
}
