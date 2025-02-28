import {post,get} from '../request/request'
import {loginDto} from '../interface/login/login'
import { resultVO } from '../interface/login/login';
export const getInfo = (param:loginDto):Promise<string> =>{
    return post('/api/newMigrateController/getTest.do',param);
};

export const accountLoginPost=(param:loginDto):Promise<resultVO>=>{
    return post('/api/login/accountLogin',param)
}

export const getUserInfo=(id:string):Promise<resultVO>=>{
    return get('/api/user/'+id);
}

export const getUserMenus=(id:string):Promise<resultVO>=>{
    return get('/api/Menu//getMenu/'+id)
}