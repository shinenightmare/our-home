import { RouteRecordRaw } from "vue-router"
import router from '@/router'
import { pa } from "element-plus/es/locales.mjs"
import { subMenuProps } from "element-plus/lib/components/index.js"

function findLocalRoutes(){
    const localRouters:RouteRecordRaw[] = []

    const files: Record<string,any> = import.meta.glob(
        '@/router/main/**/*.ts',{
            eager:true
        }
    )
    console.log(files)
    for(const key in files){
        const module = files[key]
        localRouters.push(module.default)
    }
    return localRouters;
}

export let firstMenu: any=null;
export function mapMenusToRoutes(userMenus: any[]){
    
    const localRouters=findLocalRoutes();


    const routes:RouteRecordRaw[] = []
    for(const menu of userMenus){
        if(menu.childMenu!=undefined && menu.childMenu.length>0){
            for(const submenu of menu.childMenu){
                const route=localRouters.find((item)=>item.path===submenu.path)
                if(route) routes.push(route)
                if(!firstMenu && route) firstMenu=route;
            }
        }else {
            const route=localRouters.find((item)=>item.path===menu.path)
            if(route) routes.push(route)
            if(!firstMenu && route) firstMenu=route;
        }
    }
    return routes;
}

interface IBreadCrumb{
    name:string,
    path:string
}
export function mapPathToBreadcrumbs(path:string,userMenus:any[]){
    const BreadCrumbs:IBreadCrumb[]= [];
    for(const menu of userMenus){
        for(const subMenu of menu.childMenu){
            if(subMenu.path === path){
                BreadCrumbs.push({name:menu.name ,path:menu.path})
                BreadCrumbs.push({name:subMenu.name , path:subMenu.url})
            }
        }
    }
    return BreadCrumbs;
}