import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
// import Cookies from 'js-cookie';

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
            message: `请求错误 ${response.status}: ${response.url}`,
            description: errortext
        });
    }
    const error = new Error(errortext);
    // error.name = response.status;
    // error.response = response;
    throw error;
}

// 设置axios的返回拦截(超时)
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.message.includes('timeout')) {
            return Promise.reject(error); // reject这个错误信息
        } // 判断请求异常信息中是否含有超时timeout字符串
        return Promise.reject(error);
    }
);

async function request(method: Method = 'get', url: string, params = {}) {
    // try {
    //     let token = Cookies.get('Authorization');
    //     if (token) {
    //         axios.defaults.headers.common['Authorization'] = JSON.parse(token);
    //     }
    //     // axios.defaults.headers.common["Cookie"] = '';
    // } catch (e) {
    //     console.error(e);
    // }
    const options: AxiosRequestConfig<any> = {
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
        const response = await axios(options);
        const responseReal = await checkStatus(response);
        return responseReal.data;
    } catch (error) {
        // if (!Cookies.get('currentHistory')) {
        // Cookies.set('currentHistory', window.location.href);
        // }
        // try {
        //     let status = error.response.status;
        //     if (status === 401) {
        //         // token过期
        //         // window.redirectToLoginPage();
        //     }
        //     if (status === 403) {
        //         router.push('/exception/403');
        //         return;
        //     }
        //     if (status <= 504 && status >= 500) {
        //         router.push('/exception/500');
        //         return;
        //     }
        //     if (status >= 404 && status < 422) {
        //         router.push('/exception/404');
        //     }
        // } catch {
        //     router.push('/exception/404');
        // }
        // return { code: -500 };
    }
}

export function get(url: string, params?: unknown): Promise<IResponse> {
    return request('get', url, params);
}

export function post(url: string, params?: unknown): Promise<IResponse> {
    return request('post', url, params);
}
