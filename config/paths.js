const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const resolveSrc = (relativePath) => path.resolve(resolveApp('src'), relativePath);
const resolvePublic = (relativePath) => path.resolve(resolveApp('public'), relativePath);

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx'
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

const resolves = {
    resolveApp,
    resolveSrc,
    resolvePublic
};

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = process.env.NODE_ENV === 'development' ? '/' : '.';

module.exports = {
    appPath: resolveApp('.'),
    appSrc: resolveSrc('.'),
    appBuild: resolveApp('build'),
    appPublic: resolvePublic('.'),
    appHtml: resolveApp('public/index.tpl.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appImages: resolveApp('public/assets/images'),
    appSass: resolveApp('public/sass'),
    appScripts: resolveApp('scripts'),
    ...resolves,
    moduleFileExtensions,
    publicPath
};
