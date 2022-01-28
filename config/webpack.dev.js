const merge = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

module.exports = merge(common, {
    mode: 'development',

    output: {
        path: paths.appBuild,
        filename: '[name].bundle.js',
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000.
        publicPath: publicPath
    },

    //which maps your compiled code back to your original source code
    devtool: 'inline-source-map',

    //webpack-dev-server provides you with a simple web server and the ability to use live reloading
    devServer: {
        contentBase: paths.appBuild,
        compress: true,
        host: 'localhost',
        port: 7000,
        proxy: {
            '/openapiv2': {
                // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
                target: 'http://m.4399api.com', // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                ws: true, // 是否启用  websockets;
                pathRewrite: {
                    // 去掉 路径中的  /api  的这一截
                    //"^/openapiv2": ""
                }
            }
        },
        //HMR  It allows all kinds of modules to be updated at runtime without the need for a full refresh.
        hot: true //open Hot Module Replacement
    }
});
