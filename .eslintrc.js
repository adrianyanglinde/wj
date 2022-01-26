module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
        jquery: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    // add your custom rules here
    rules: {
        'prettier/prettier': 'error',
        // allow async-await
        'generator-star-spacing': 'off',
        '@typescript-eslint/no-var-requires': 0
    },
    globals: {
        document: true,
        window: true,
        require: true,
        _: true
    }
};
