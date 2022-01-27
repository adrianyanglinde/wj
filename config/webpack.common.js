const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
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
            '@components': paths.resolveSrc('components'),
            '@assets': paths.resolvePublic('assets'),
            '@sass': paths.resolvePublic('sass')
        }
    }
};
