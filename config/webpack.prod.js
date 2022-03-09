const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;

// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = publicPath.slice(0, 1);

module.exports = merge(common, {
    mode: 'production',

    output: {
        path: paths.appBuild,
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js',
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000.
        //TODO: packed url can replace by CDN
        publicPath: publicPath
    },

    //which maps your compiled code back to your original source code
    devtool: false,

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: Object.assign(
                            {},
                            shouldUseRelativeAssetPaths
                                ? {
                                      publicPath: '../'
                                  }
                                : undefined
                        )
                    },
                    require.resolve('css-loader'),
                    require.resolve('sass-loader')
                ]
            }
        ]
    },
    plugins: [
        new ExtractCssChunks({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css'
        }),
        new CleanWebpackPlugin(),
        // Copies individual files or entire directories, which already exist, to the build directory.
        new CopyPlugin({
            patterns: [
                { from: paths.resolvePublic('libs'), to: `${paths.appBuild}/libs` },
                { from: paths.resolvePublic('favicon.ico'), to: paths.appBuild }
            ]
        })
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                // Create a custom vendor chunk, which contains certain node_modules packages
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react',
                    priority: -9,
                    chunks: 'all'
                },
                // Create a vendors chunk, which includes all code from node_modules in the whole application.
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10,
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});
