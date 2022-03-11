import Mock from 'mockjs';

const prefix = '';

Mock.mock(new RegExp(`${prefix}/testApi`), 'get', {
    c: 0,
    e: '获取配置信息失败',
    d: {
        name: 'geng'
    }
});

Mock.mock(new RegExp(`${prefix}/testUpload-img`), 'post', {
    c: 0,
    e: '获取配置信息失败',
    d: {
        fid: '765be038d665367',
        full: 'https://fs.img4399.com/kf/2022/02/28/18_2682ae082bdf.jpg',
        md5: '765be038d6653679560f09acc2dd7998'
    }
});

Mock.mock(new RegExp(`${prefix}/testUpload-file`), 'post', {
    c: 0,
    e: '获取配置信息失败',
    d: {
        fid: '765be038d',
        full: 'https://fs.img4399.com/kf/2022/02/28/18_2682ae082bdf.pdf',
        md5: '765be038d6653679560'
    }
});
