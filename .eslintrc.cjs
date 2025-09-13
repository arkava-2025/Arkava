module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:astro/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        // Respeta los paths de tsconfig.json
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  overrides: [
    // Reglas para archivos Astro
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
    // Reglas para TS/TSX
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: false,
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};