const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

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
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
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
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            inject: 'body',
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // The ProvidePlugin makes a package available as a variable in every module compiled through webpack.
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
            '@': paths.appSrc,
            '@pages': paths.resolveSrc('pages'),
            '@components': paths.resolveSrc('components'),
            '@assets': paths.resolvePublic('assets'),
            '@sass': paths.resolvePublic('sass')
        }
    }
};
