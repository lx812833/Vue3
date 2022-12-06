module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended'],
  rules: {
    'vue/valid-template-root': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
      },
    ],
  },
}