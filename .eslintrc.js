module.exports = {
    extends: 'next',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'promise', 'simple-import-sort'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:promise/recommended', 'prettier'],
    ignorePatterns: ['bin', 'node_modules'],
    rules: {
        'space-before-function-paren': [
            'error',
            {
                named: 'never',
            },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
}
