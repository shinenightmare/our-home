import axios from 'axios'
import { localCache } from '@/utils/cache'
import { TOKEN } from '@/global/constants'
export const authInfos = {
    'Authorization': localCache.getCache(TOKEN) ? `Bearer ${localCache.getCache(TOKEN)}` : ''
};
const instance = axios.create({
    baseURL:'',
    timeout: 10000,
    withCredentials:  true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': 'no-cache',
    }
})


instance.interceptors.request.use(
    config => {
        let token = localCache.getCache(TOKEN);
        if (token) {
            config.headers["Authorization"]="Bearer "+ token
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)
 
// response 拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data
    },
    error => {  
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)


export function post(url:any,params:any,config:any={}):Promise<any>{
    return new Promise((resolve,reject)=>{
        instance
            .post(url,params,config)
            .then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    if (err.response) {
                        switch (err.response.status) {
                            case 400:
                            case 401:
                            case 500:
                                resolve(err.response.data);
                                break;
                            default:
                                reject(err);
                        }
                    } else {
                        reject('Network timeout');
                    }
                }
            )
            .catch((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                        case 401:
                        case 500:
                            resolve(err.response.data);
                            break;
                        default:
                            reject(err);
                    }
                } else {
                    reject(err);
                }
            });
    })
}

export function get(url:any,params?:any):Promise<any>{
    return new Promise((resolve,reject)=>{
        instance.get(url,params)
                .then((res)=>{
                    resolve(res)
                })
                .catch((err) => {
                    if (err.response) {
                        switch (err.response.status) {
                            case 400:
                            case 401:
                            case 500:
                                resolve(err.response.data);
                                break;
                            default:
                                reject(err);
                        }
                    } else {
                        reject(err);
                    }
                });
    })
}
export default instance
