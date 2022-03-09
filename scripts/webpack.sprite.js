const fs = require('fs');
const shell = require('shelljs');
const webpack = require('webpack');
const SpritesmithPlugin = require('webpack-spritesmith');
const { findParam } = require('./utils');
const paths = require('../config/paths');

const name = findParam('name');
const type = findParam('type');

const fileExists = fs.existsSync(`${paths.appImages}/${type}/${name}`);

if (!name) {
    shell.echo('请输入--name={文件夹名称}进行对应雪碧图生成');
    shell.exit();
}
if (!fileExists) {
    shell.echo('输入的文件夹不存在');
    shell.exit();
}
const templateFunction = function (data) {
    var shared = `@mixin sprite-${name} { background-image: url(I); background-size: SWpx SHpx; }`
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

const configuration = {
    entry: `${paths.appScripts}/sprite-entry.js`,
    output: {
        path: `${paths.appPath}/dist`,
        filename: 'sprite.min.js'
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: `${paths.appImages}/${type}/${name}`,
                glob: '*.png'
            },
            target: {
                image: `${paths.appImages}/${type}/sprite-${name}.png`,
                css: [[`${paths.appSass}/${type}/sprite-${name}.scss`, { format: 'function_based_template' }]]
            },
            apiOptions: {
                cssImageRef: `~@assets/images/${type}/sprite-${name}.png`
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

const compiler = webpack(configuration);

compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(err);
    }
    console.log('done');
    shell.rm('-rf', `${paths.appPath}/dist`);
    // compiler.close((closeErr) => {
    //     // ...
    // });
});
