import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}', '**/*.ts', '**/*.tsx'] },
  { ignores: ['**/*.js', '**/*.mjs'] },
  { languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    }
  },
  {
    plugins: {
      js: pluginJs,
      react: pluginReact,
      '@typescript-eslint': tseslint.plugin,
    }
  },
];
