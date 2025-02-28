import { TOKEN,USER_MENUS } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { firstMenu } from '@/utils/map-menus';

import { createRouter, createWebHashHistory,RouteRecordRaw } from 'vue-router';
const routes:Array<RouteRecordRaw>= [
    {
        path: '/',
        redirect:'/main'
    },
    {
        path: '/error',
        name: "error",
        component:()=> import('../views/common/error.vue')
    },{
        path: '/login',
        name: 'login',
        component:() => import('../views/login/login.vue')
    },{
        path: '/main',
        name: 'main',
        component:() => import('../views/main/main.vue'),
    },{
        path: '/:pathMatch(.*)',
        component:() => import('../views/not_found/notFound.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// beforeEach的作用：
// 权限验证：
// 检查用户是否有权限访问目标路由，如果没有权限，可以重定向到登录页或其他页面。

// 数据预加载：
// 在进入某个路由之前，预先加载所需的数据。

// 路由重定向：
// 根据某些条件（如用户登录状态）将用户重定向到其他路由。

// 全局逻辑处理：
// 在每次路由切换时执行一些全局逻辑，如页面访问统计、路由日志记录等。
router.beforeEach((to,from,next)=>{
    const token = localCache.getCache(TOKEN)
    const userMenus = localCache.getCache(USER_MENUS);
    if(token && userMenus){
        if(to.path==='/main'){
            next(firstMenu)
        }
        next();
    }
    next()
})

export default router;