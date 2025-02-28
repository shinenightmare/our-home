<template>
  <div class="header-info">
    <div class="icon">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <el-icon><Bell /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="userinfo">
          <el-avatar :size="30" src="/src/assets/image/cat.jpg" />
          <span class="user-nickName"> nickName </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExit">
              <el-icon><CircleClose /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TOKEN } from "@/global/constants";
import router from "@/router";
import { localCache } from "@/utils/cache";
function handleExit() {
  localCache.removeCache(TOKEN);
  router.push("/login");
}
</script>
<style scope>
.header-info {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.icon {
  .el-icon {
    margin-left: 5px;
  }
}
.userinfo {
  margin-left: 5px;
}
.info {
  margin-left: 5px;
  .el-dropdown-menu__item {
    line-height: 36px !important;
    padding: 6px 22px;
  }
  .userinfo {
    display: flex;
    align-items: center;
    cursor: pointer;

    .user-nickName {
      margin-left: 5px;
    }
  }
}
</style>
