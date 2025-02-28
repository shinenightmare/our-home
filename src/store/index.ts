import {createPinia} from 'pinia'
import type { App } from 'vue';
import userLoginStore from './login/login'

const pinia = createPinia();

function registerStore(app:App<Element>){
    app.use(pinia)
    const loginStore= userLoginStore();
    loginStore.loadLocalCacheAction();
}

export default registerStore


