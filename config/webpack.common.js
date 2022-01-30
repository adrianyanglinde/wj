const webpack = require('webpack');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const createHtml = require('./getWebpackHtmlPlugins');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.NODE_ENV === 'development';

// Get environment variables to inject into our app.
const env = getClientEnvironment();

module.exports = {
    entry: {
        index: paths.appIndexJs
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader')
                }
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: require.resolve('style-loader')
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            minimize: true,
                            sourceMap: shouldUseSourceMap
                        }
                    },
                    {
                        loader: require.resolve('sass-loader'),
                        options: {
                            sourceMap: shouldUseSourceMap
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 8192,
                            esModule: false,
                            //url relative to output publicPath
                            name: 'images/[name]_[hash:7].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation
        ...createHtml(),
        new webpack.HotModuleReplacementPlugin(),
        // The DefinePlugin replaces variables in your code with other values or expressions at compile time.
        new webpack.DefinePlugin(env.stringified),
        // The ProvidePlugin makes a package available as a variable in every module compiled through webpack.
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx', '.scss', '.sass'],
        alias: {
            '@': paths.appSrc,
            '@api': paths.resolveSrc('api'),
            '@utils': paths.resolveSrc('utils'),
            '@pages': paths.resolveSrc('pages'),
            '@model': paths.resolveSrc('model'),
            '@components': paths.resolveSrc('components'),
            '@containers': paths.resolveSrc('containers'),
            '@hooks': paths.resolveSrc('hooks'),
            '@server': paths.resolveSrc('server'),
            '@assets': paths.resolvePublic('assets'),
            '@sass': paths.resolvePublic('sass')
        }
    }
};
