<template>
  <!-- <span class="logo">
    <img src="@/assets/vue.svg" />
    <h3>OUR HOME</h3>
  </span> -->
  <div class="logo">
    <img src="@/assets/vue.svg" />
    <h2 v-show="!isFold" class="title">OUR HOME</h2>
  </div>
  <div>
    <el-menu
      active-text-color="#f00"
      background-color="#fff"
      :collapse="isFold"
      class="el-menu-vertical-demo"
      :default-active="defaultActive"
      text-color="#000"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.childMenu && item.childMenu.length > 0">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 图标部分 -->
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.childMenu" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                <el-icon>
                  <component :is="subitem.icon" />
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''" @click="handleItemClick(item)">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import userLoginStore from "@/store/login/login";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { firstMenu } from "@/utils/map-menus";

defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
});
const userMenus = userLoginStore().userMenus;

const router = useRouter();
function handleItemClick(item: any) {
  const url = item.path;
  router.push(url);
}

const defaultActive = ref(firstMenu.id + "");
</script>
<style scope>
.logo {
  display: flex;
  height: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: hidden;

  .img {
    height: 100%;
    /* padding-left: 10px; */
  }
  .title {
    /* opacity: 50%; */
    color: #fff;
    size: auto;
  }
}
</style>
