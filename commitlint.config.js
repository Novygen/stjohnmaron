// commitlint.config.js
/* eslint-disable no-undef */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // You can override rules here if needed:
  rules: {
    // Example: require a scope in your subject
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    // ...
  },
};
