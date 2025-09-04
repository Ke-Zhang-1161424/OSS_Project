import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";


// axios在这里的baseURL是指向后端API的基础路径
axios.defaults.baseURL = 'http://localhost:5000/api/';


// 这个函数用于从Axios的响应中提取数据部分
const responseBody = (response: AxiosResponse) => response.data;

// 这里设置了请求拦截器，在每个请求中添加一个延迟，模拟网络延迟，然后更好的观察加载状态
axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[ ] = [ ];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;

        case 401:
            toast.error(data.title);
            break;

        case 500:
            router.navigate('/server-error', { state: { error: data } });
            break;

        default:
            break;
    }
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