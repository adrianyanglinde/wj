import Axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';

interface IResponse {
    c?: number;
    d?: any;
    e?: string;
}

interface CodeMessage {
    [propName: number]: string;
}

const codeMessage: CodeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

function checkStatus(response: AxiosResponse<IResponse>) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    if (response.status !== 401) {
        console.log({
            message: `请求错误 ${response.status}: ${response.request.responseURL}`,
            description: errortext
        });
    }
    const error = new Error(errortext);
    (error as any)._status = response.status;
    (error as any)._response = response;
    throw error;
}

Axios.interceptors.response.use(
    (response) => {
        const {
            data: { c, e }
        } = response;
        if (c !== 0) {
            const error = new Error(e);
            (error as any)._code = c;
            (error as any)._response = response;
            return Promise.reject(error);
        }
        return response;
    },
    (error) => {
        checkStatus(error.response);
        return Promise.reject(error);
    }
);

async function request(method: Method = 'get', url: string, params = {}) {
    const options: AxiosRequestConfig = {
        url: url,
        method: method,
        // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
        // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL // baseURL: baseURL.baseURL,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        timeout: 6000
    };
    if (method === 'post') {
        options.data = JSON.stringify(params);
    } else {
        options.params = { ...params };
    }
    try {
        const response = await Axios(options);
        return response.data;
    } catch (error) {
        const status = error._status || error._code;
        console.log('status', status);
        // some route
    }
}

export function get(url: string, params?: unknown): Promise<void | IResponse> | string {
    return request('get', url, params);
}

export function post(url: string, params?: unknown): Promise<void | IResponse> | string {
    return request('post', url, params);
}

// ref:
// https://segmentfault.com/a/1190000038563075
// https://medium.com/neyasistechnology/react-handling-errors-with-axios-interceptor-and-redux-6e523fda3706
// https://www.jianshu.com/p/17d9e5db7a31
