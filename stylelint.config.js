module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-html/vue',
        'stylelint-prettier/recommended',
    ],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
    },
    plugins: ['stylelint-prettier'],
}
