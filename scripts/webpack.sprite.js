const path = require('path');
const shell = require('shelljs');
const SpritesmithPlugin = require('webpack-spritesmith');
const { findParam } = require('./utils');
const paths = require('../config/paths');

const name = findParam('name');
if (!name) {
    shell.echo('请输入name页面名称进行对应页面雪碧图生成');
    shell.exit();
}
const templateFunction = function (data) {
    console.log('data', data);
    var shared = `%sprite-${name} { background-image: url(I); background-size: SWpx SHpx; }`
        .replace('I', data.sprites[0].image)
        .replace('SW', data.spritesheet.width)
        .replace('SH', data.spritesheet.height);
    var perSprite = data.sprites
        .map(function (sprite) {
            return '@mixin N { width: Wpx; height: Hpx;background-position: Xpx Ypx; }'
                .replace('N', sprite.name)
                .replace('W', sprite.width)
                .replace('H', sprite.height)
                .replace('X', sprite.offset_x)
                .replace('Y', sprite.offset_y);
        })
        .join('\n');

    return shared + '\n' + perSprite;
};

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'sprite.js'),
    output: {
        path: paths.appBuild,
        filename: '[name].min.js'
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: `${paths.appImages}/${name}`,
                glob: '*.png'
            },
            target: {
                image: `${paths.appImages}/sprite-${name}.png`,
                css: [[`${paths.appSass}/sprite-${name}.scss`, { format: 'function_based_template' }]]
            },
            apiOptions: {
                cssImageRef: `~@assets/images/sprite-${name}.png`
            },
            customTemplates: {
                function_based_template: templateFunction
            },
            spritesmithOptions: {
                algorithm: 'top-down',
                padding: 10
            }
        })
    ]
};
