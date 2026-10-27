const tseslint = require('typescript-eslint');
const angular = require('@angular-eslint/eslint-plugin');
const template = require('@angular-eslint/eslint-plugin-template');
const templateParser = require('@angular-eslint/template-parser');

module.exports = tseslint.config(
  { files: ['**/*.ts'], extends: [...tseslint.configs.recommended], plugins: { '@angular-eslint': angular }, processor: template.processors['extract-inline-html'], rules: { '@angular-eslint/prefer-inject': 'error', '@angular-eslint/no-empty-lifecycle-method': 'error' } },
  { files: ['**/*.html'], languageOptions: { parser: templateParser }, plugins: { '@angular-eslint/template': template }, rules: { '@angular-eslint/template/alt-text': 'error', '@angular-eslint/template/label-has-associated-control': 'error', '@angular-eslint/template/button-has-type': 'error' } }
);
