/**
 * @file 页面html配置
 * @use: 动态配置html页面，获取src下每个文件下的pageinfo.json内容,解析到HtmlWebpackPlugin中
 */

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const paths = require('./paths');

const htmlArr = [];
function createHtml() {
    htmlArr.push(
        new HtmlWebpackPlugin({
            chunks: [`index`], // 引入的js
            title: 'wj',
            template: paths.appHtml,
            favicon: paths.resolvePublic('favicon.ico'),
            filename: 'index.html', // html位置
            minify: {
                removeComments: true,
                minifyJS: true,
                // 压缩html
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        })
    );
    return htmlArr;
}

module.exports = createHtml;
