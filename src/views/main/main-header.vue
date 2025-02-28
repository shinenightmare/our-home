<template>
  <div class="main-header">
    <div class="menu-icon" @click="iconClick">
      <el-icon size="30px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadCrumb">面包屑</div>
      <headerInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import headerInfo from "./component/header-info.vue";
const isFold = ref(false);

const emit = defineEmits(["foldChange"]);

function iconClick() {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
}
</script>
<style scope>
.main-header {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0px;
  width: 100%;
}
.menu-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: auto;
}
.content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 让面包屑和个人信息分布在两侧 */
  padding: 0 10px;
  font-size: 20px;
  flex: 1; /* 让 .content 占据除 .menu-icon 之外的剩余空间 */
}
</style>
