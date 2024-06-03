import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, process: 'readonly' }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    settings: {
      react: {
        version: 'detect' // Adiciona a versão do React
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Desativa a regra de React em escopo
      '@typescript-eslint/no-unused-vars': 'warn' // Ajusta a regra para aviso
    }
  }
]
