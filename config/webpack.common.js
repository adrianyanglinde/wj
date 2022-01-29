const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const shouldUseSourceMap = process.env.NODE_ENV === 'development';
// Get environment variables to inject into our app.
const env = getClientEnvironment(paths.publicPath);

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
                            name: './images/[name]_[hash:7].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            inject: 'body',
            filename: './index.html'
            // favicon: paths.resolvePublic('favicon.ico')
        }),
        new webpack.HotModuleReplacementPlugin(),
        // The DefinePlugin replaces variables in your code with other values or expressions at compile time.
        new webpack.DefinePlugin(env.stringified),
        // Then you can use %NODE_ENV% in your template html file, and you can use it with html-webpack-plugin's default template syntax
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(env.raw),
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
