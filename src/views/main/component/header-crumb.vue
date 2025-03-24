<template>
  <div class="crumb">
    <el-breadcrumb :separator-icon="ArrowRight">
        <template v-for="item in breadcrumbs" :key="item.name">
            <el-breadcrumb-item :to="item.path" >{{ item.name }}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {mapPathToBreadcrumbs} from '@/utils/map-menus'
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import userLoginStore from "@/store/login/login";
import { pa } from 'element-plus/es/locales.mjs';

const route =useRoute();
const userMenu = userLoginStore().userMenus
const breadcrumbs = computed(()=>{
    return mapPathToBreadcrumbs(route.path,userMenu);
})
</script>
<style scoped></style>
