module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    // Handle `'React' was used before it was defined`
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // Disable base rule and get support for Typescript features e.g. types
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // Don't need file extension when importing modules and/or ts,tsx
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    // Ignore test files and vite config when checking if a devDependency is explicitly imported
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          'src/test/*',
          'vite.config.ts',
        ],
      },
    ],
    // Allow named exports
    'import/prefer-default-export': 'off',

    // Require explicit boolean attribute in JSX
    'react/jsx-boolean-value': ['error', 'always'],
    // Allow JSX in .tsx files
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    // Allow more than one jsx expression per line
    'react/jsx-one-expression-per-line': 'off',
    // Allow spreading props
    'react/jsx-props-no-spreading': 'off',
    // Don't require defaultProps definition for optional props
    'react/require-default-props': 'off',
    // Allow initial state to be outside class component constructor
    'react/state-in-constructor': 'off',

    // Don't always require concise arrow function syntax
    'arrow-body-style': ['off'],

    // Allow both implicit/explicit function returns in the same arrow function
    'consistent-return': 'off',

    // Allow bitwise operations
    'no-bitwise': 'off',

    // Allow nested ternary expressions
    'no-nested-ternary': 'off',

    // Allow unary operators
    'no-plusplus': 'off',

    // Allow underscore dangle e.g. __gohashid
    'no-underscore-dangle': 'off',

    // Only accept arrow functions for Components
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    'import/resolver': {
      // Add typescript support to eslint-plugin-import
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
