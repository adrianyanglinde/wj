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

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = publicPath.slice(0, 1);

// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';

module.exports = merge(common, {
    mode: 'production',

    output: {
        path: paths.appBuild,
        filename: 'js/[name].bundle.js',
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000.
        //TODO: packed url can replace by CDN
        publicPath: publicPath
    },

    //which maps your compiled code back to your original source code
    devtool: false,

    module: {
        rules: [
            {
                test: /\.(sa|sc)ss$/,
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
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});
