exports.findParam = function (param) {
    let result = '';
    process.argv.forEach((argv) => {
        if (argv.indexOf(`--${param}`) === -1) return;
        result += argv.split('=')[1];
    });
    return result;
};
