const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = '/';

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
                            sourceMap: true,
                            publicPath: publicPath //TODO:replace the url of images in css     relative url
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: [
                    //             require('autoprefixer'),
                    //             require('postcss-px2rem')({
                    //                 remUnit: 36, // 36px = 1rem
                    //                 remPrecision: 2 // rem的小数点后位数
                    //             })
                    //         ]
                    //     }
                    // },
                    {
                        loader: 'sass-loader',
                        options: {
                            // prependData: 'variables.scss',
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
                            name: 'images/[name]_[hash:7].[ext]' //url relative to output publicPath
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
        // new SpritesmithPlugin({
        //   // 目标小图标
        //   src: {
        //     cwd: path.resolve(__dirname, "../src/assets/images/icons"),
        //     glob: "*.png"
        //   },
        //   // 输出雪碧图文件及样式文件
        //   target: {
        //     image: path.resolve(__dirname, "../src/assets/images/sprite.png"),
        //     css: [
        //       [
        //         path.resolve(__dirname, "../src/assets/sass/sprite.scss"),
        //         {
        //           format: "function_based_template"
        //         }
        //       ]
        //     ]
        //   },
        //   customTemplates: {
        //     function_based_template: path.resolve(
        //       __dirname,
        //       "../my_handlebars_template.handlebars"
        //     )
        //   },
        //   // 样式文件中调用雪碧图地址写法
        //   apiOptions: {
        //     cssImageRef: "../assets/images/sprite.png?v=" + Date.parse(new Date())
        //   },
        //   spritesmithOptions: {
        //     algorithm: "binary-tree",
        //     padding: 4
        //   }
        // }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
            '@': paths.appSrc,
            '@pages': paths.resolveSrc('pages'),
            '@assets': paths.resolveSrc('assets'),
            '@components': paths.resolveSrc('components')
        }
    }
};
