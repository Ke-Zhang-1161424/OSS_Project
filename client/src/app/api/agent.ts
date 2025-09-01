import axios, { AxiosResponse, AxiosError } from "axios";


// axios�������baseURL��ָ����API�Ļ���·��
axios.defaults.baseURL = 'http://localhost:5000/api/';


// ����������ڴ�Axios����Ӧ����ȡ���ݲ���
const responseBody = (response: AxiosResponse) => response.data;

// ����������������������Ӧ��then��catch����ǰ��������
axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    console.log('caught by ibnterceptor');
    return Promise.reject(error.response);
})

// ��������װ�˳��õ�HTTP���󷽷�������API����
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url,body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url,body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

// ��������������Ʒ��ص�API�˵�
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