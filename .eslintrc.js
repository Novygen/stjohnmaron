module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint-/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'next',
    'next/core-web-vitals',
    // If you use Prettier for formatting:
    'plugin:prettier/recommended',
  ],
  rules: {
    // Add or override rules as desired
    '@typescript-eslint/no-unused-vars': ['warn'],
    // ...
  },
  overrides: [
    {
      // Match your JS config files:
      files: ['commitlint.config.js', '.eslintrc.js'],
      env: {
        // Tells ESLint that these files run in Node
        node: true,
      },
      rules: {
        // Turn off `no-undef` for these specific files if needed
        'no-undef': 'off',
      },
    },
  ],
};
