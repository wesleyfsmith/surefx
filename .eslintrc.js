module.exports = {
  // ...
  'rules': {
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
    'react/prop-type': 0
  },
  // 'plugins': [
  //   'meteor'
  // ],
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'next/core-web-vitals']
};