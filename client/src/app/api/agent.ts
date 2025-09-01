import axios, { AxiosResponse, AxiosError } from "axios";


// axios在这里的baseURL是指向后端API的基础路径
axios.defaults.baseURL = 'http://localhost:5000/api/';


// 这个函数用于从Axios的响应中提取数据部分
const responseBody = (response: AxiosResponse) => response.data;

// 这个拦截器可以在请求或响应被then或catch处理前拦截它们
axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    console.log('caught by ibnterceptor');
    return Promise.reject(error.response);
})

// 这个对象封装了常用的HTTP请求方法，简化了API调用
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url,body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url,body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

// 这个对象定义了与产品相关的API端点
const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)  
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;