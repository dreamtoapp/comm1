// .eslintrc.js
// .eslintrc.js
module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],     // point to your TSConfig(s)
    tsconfigRootDir: __dirname,       // ensures paths are resolved correctly
    projectService: true,             // enable type-aware rules ⚠️
  },

  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-type-checked', // no-unsafe rules
  ],

  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'tailwindcss',
    'security',
  ],

  rules: {
    // ------------------------------------------------------------------------
    // STAGED RULE ADOPTION: comment out everything you’re not ready for yet.
    // Once you’ve fixed `no-unused-vars`, uncomment each block in turn.
    // ------------------------------------------------------------------------

    // TYPE-SAFE “no-unsafe” RULES (requires parserOptions.project)  
    // '@typescript-eslint/no-unsafe-assignment': 'error',  
    // '@typescript-eslint/no-unsafe-call':       'error',  
    // '@typescript-eslint/no-unsafe-member-access':'error',  
    // '@typescript-eslint/no-unsafe-argument':   'error',  

    // REACT HOOKS INTEGRITY  
    // 'react-hooks/rules-of-hooks':  'error',  
    // 'react-hooks/exhaustive-deps': 'error',  

    // CONSOLE RESTRICTIONS  
    // 'no-console': ['warn', { allow: ['warn', 'error'] }],  

    // TAILWIND CSS ORDERING  
    // 'tailwindcss/classnames-order': 'warn',  

    // SECURITY HOTSPOTS  
    // 'security/detect-object-injection':      'warn',  
    // 'security/detect-non-literal-fs-filename':'warn',  
    // 'security/detect-child-process':        'warn',  
  },

  settings: {
    react: { version: 'detect' },
  },
};

