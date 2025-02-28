<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '200px'">
        <mainAsideVue :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header class="main-header"
          ><HeaderVue @fold-change="handleFoldChange"
        /></el-header>
        <el-main><router-view></router-view> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainAsideVue from "../main/main-aside.vue";
import HeaderVue from "../main/main-header.vue";
import { ref } from "vue";

const isFold = ref(false);

function handleFoldChange(flag: boolean) {
  isFold.value = flag;
}
</script>
<style scope>
.main {
  height: 100%;
}
.main-content {
  height: 100%;
  .el-aside {
    background-color: rgb(223, 220, 220);
  }
  .el-aside {
    transition: width 0.3s ease;
  }
  .el-header {
    height: 50px;
    flex-shrink: 0;
  }
  .el-main {
    background-color: beige;
    flex: 1;
  }
}
</style>
