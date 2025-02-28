import {defineStore} from 'pinia'
import {accountLoginPost, getUserInfo,getUserMenus} from '@/service/api/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { TOKEN,USER_INFO,USER_MENUS } from '@/global/constants'
import { resultVO } from '@/service/interface/login/login'
import {mapMenusToRoutes} from '@/utils/map-menus'

const userLoginStore = defineStore('login',{
    state:()=>({
        token:localCache.getCache(TOKEN)??'',
        userInfo: localCache.getCache(USER_INFO)??{},
        userMenus: localCache.getCache(USER_MENUS)??[]
    }),
    actions:{
        async loginByAccount(account:any){
            const loginResult:resultVO= await accountLoginPost(account)
            if(loginResult.code==200){
                const id=loginResult.data.id;
                this.token=loginResult.data.token;
    
                localCache.setCache(TOKEN,loginResult.data.token)
                

                const returnObj:resultVO= await getUserInfo(id);
                const userInfo = returnObj.data;

                const userMenusResult:resultVO= await getUserMenus(id);
                const userMenus=userMenusResult.data;
                
                localCache.setCache(USER_INFO,userInfo);
                localCache.setCache(USER_MENUS,userMenus);


                const routes=mapMenusToRoutes(userMenus);
                routes.forEach(route=>router.addRoute('main',route))
                router.push('/main')

            }else{
                return Promise.reject(new Error(loginResult.message));
            }
        },
        loadLocalCacheAction(){
            const token=localCache.getCache(TOKEN);
            const userInfo=localCache.getCache(USER_INFO);
            const userMenus=localCache.getCache(USER_MENUS);
            if(token && userInfo && userMenus){
                this.token=token;
                this.userInfo=userInfo;
                this.userMenus=userMenus;
                
                const routes=mapMenusToRoutes(userMenus);
                routes.forEach(route=>router.addRoute('main',route))
            }
        }
    }
})

export default userLoginStore;