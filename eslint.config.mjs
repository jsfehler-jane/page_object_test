import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import mochaPlugin from 'eslint-plugin-mocha';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
      plugins: {'@stylistic': stylistic},

      // Keep the rules sorted alphabetically or so help me...
      rules: {
          'camelcase': "error",
          'capitalized-comments': ["error"],
          'complexity': ["error", 11],
          'consistent-return': "error",
          'eqeqeq': "error",
          'no-alert': "error",
          'no-console': "error",
          'no-constructor-return': "error",
          'no-duplicate-imports': "error",
          'no-return-assign': "error",
          'no-self-compare': "error",
          'no-sequences': "error",
          // 'no-shadow': "error",
          'no-template-curly-in-string': "error",
          // 'no-undefined': "error",
          'no-unneeded-ternary': "error",
          'no-useless-assignment': "error",
          'no-useless-concat': "error",
          'no-useless-rename': "error",
          'no-useless-return': "error",
          'prefer-const': "error",
          'prefer-template': "error",
          'require-atomic-updates': "error",
          // 'require-await': "error",
          '@stylistic/function-call-argument-newline': ["error", "consistent"],
          '@stylistic/function-call-spacing': ["error", "never"],
          '@stylistic/function-paren-newline': ["error", "multiline"],
          '@stylistic/indent': ["error", 4],
          '@stylistic/line-comment-position': ["error", { "position": "above" }],
          '@stylistic/max-len': ["error", { "code": 99, "ignoreTrailingComments": true, }],
          '@stylistic/multiline-comment-style': ["error", "starred-block"],
          '@stylistic/no-extra-semi': "error",
          '@stylistic/one-var-declaration-per-line': ["error", "always"],
          '@stylistic/object-curly-newline': ['error', { "multiline": true }],
          '@stylistic/object-property-newline': ["error", {"allowAllPropertiesOnSameLine": true}],
          '@stylistic/padding-line-between-statements': [
            "error", { blankLine: "always", prev: "*", next: "return" },
          ],
          '@stylistic/semi': "error",
          '@stylistic/semi-style': ["error", "last"],
          '@stylistic/space-before-function-paren': [
              "error",
              {
                  "anonymous": "always",
                  "named": "never",
                  "asyncArrow": "always"
              }],
      },
  },
  mochaPlugin.configs.flat.recommended,
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

];
