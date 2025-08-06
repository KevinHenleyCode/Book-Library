import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:jsdoc/recommended',
    'plugin:jsx-a11y/recommended',
  ),
  {
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
    },
    rules: {
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],
      'jsdoc/require-description': 'warn',

      // Accessibility Rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
  },
]

export default eslintConfig
