module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
        jquery: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
    overrides: [
        {
            // Your TypeScript files extension
            files: ['*.ts', '*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
            parserOptions: {
                // This option allows you to provide a path to your project's tsconfig.json.
                // This setting is required if you want to use rules which require type information.
                project: './tsconfig.json'
            }
        }
    ],
    // add your custom rules here
    rules: {
        'prettier/prettier': 'error',
        // allow async-await
        'generator-star-spacing': 'off',
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-empty-function': 0
    },
    globals: {
        document: true,
        window: true,
        require: true,
        _: true,
        classnames: true
    },
    settings: {
        // 'import/resolver': {
        //     alias: {
        //         map: [
        //             ['@components', './src/components/']
        //         ],
        //         // extensions: ['.ts', '.js', '.jsx', '.json']
        //     }
        // }
    }
};
