const merge = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('./paths');
const proxyConfig = require('./proxy.config');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';

module.exports = merge(common, {
    mode: 'development',

    output: {
        path: paths.appBuild,
        filename: '[name].bundle.js',
        // The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000.
        publicPath: publicPath
    },

    // which maps your compiled code back to your original source code
    devtool: 'inline-source-map',

    //webpack-dev-server provides you with a simple web server and the ability to use live reloading
    devServer: {
        // By default WebpackDevServer serves physical files from current directory
        // in addition to all the virtual build products that it serves from memory.
        // This is confusing because those files won’t automatically be available in
        // production build folder unless we copy them. However, copying the whole
        // project directory is dangerous because we may expose sensitive files.
        // Instead, we establish a convention that only files in `public` directory
        // get served. Our build script will copy `public` into the `build` folder.
        // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
        // Note that we only recommend to use `public` folder as an escape hatch
        // for files like `favicon.ico`, `manifest.json`, and libraries that are
        // for some reason broken when imported through Webpack. If you just want to
        // use an image, put it in `src` and `import` it from JavaScript instead.
        contentBase: paths.appPublic,
        compress: true,
        host: 'f.4399.com',
        port: 9900,
        proxy: proxyConfig,
        //HMR  It allows all kinds of modules to be updated at runtime without the need for a full refresh.
        hot: true, //open Hot Module Replacement
        // With devServer.quiet enabled, nothing except the initial startup information will be written to the console.
        // This also means that errors or warnings from webpack are not visible.
        quiet: true,
        // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
        historyApiFallback: true
    }
});
