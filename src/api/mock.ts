import Mock from 'mockjs';

const prefix = '';

Mock.mock(new RegExp(`${prefix}/testApi`), 'get', {
    c: 0,
    e: '获取配置信息失败',
    d: {
        name: 'geng'
    }
});
