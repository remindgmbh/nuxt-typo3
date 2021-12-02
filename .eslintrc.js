module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        '@nuxtjs/eslint-config-typescript',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: false,
            },
        ],
        'no-console': [
            'warn',
            {
                allow: ['warn', 'error'],
            },
        ],
        'import/namespace': [2, { allowComputed: true }],
    },
}
