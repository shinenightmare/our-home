<template>
  <div class="login-panel">
    <h1 class="title">家庭订单管理后台</h1>
    <div class="tabs">
      <el-tabs
        type="card"
        :stretch="true"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </span>
          </template>
          <AccountPanel ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span class="text">短信登录</span>
            </span>
          </template>
          <PhonePanel ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="aboutPWD">
      <el-checkbox v-model="rememberPwd" :label="rememberName" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="checkIn" type="primary" :round="true" @Click="login()"
      >登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import AccountPanel from "../login-panel/panel-account.vue";
import PhonePanel from "../login-panel/panel-phone.vue";
import { localCache } from "@/utils/cache";
import { ISREMEMBER_PASSWORD } from "@/global/constants";
import type { TabsPaneContext } from "element-plus";
const activeName = ref("account");
const rememberName = ref<string>(
  activeName.value === "account" ? "记住密码" : "记住手机号"
);
const rememberPwd = ref<boolean>(
  localCache.getCache(ISREMEMBER_PASSWORD) ?? false
);
watch(rememberPwd, (newValue: boolean) => {
  localCache.setCache(ISREMEMBER_PASSWORD, newValue);
});
const accountRef = ref<InstanceType<typeof AccountPanel>>();
const phoneRef = ref<InstanceType<typeof PhonePanel>>();

const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.paneName === "account") {
    rememberName.value = "记住密码";
  } else rememberName.value = "记住手机号";
};

function login() {
  if (activeName.value === "account") {
    accountRef.value?.accountLogin(rememberPwd.value);
  } else if (activeName.value === "phone") {
    console.log("点击了手机登录!");
  }
}
</script>
<style scope>
.login-panel {
  width: 400px;
  margin-bottom: 100px;
  padding: 10px;
  background-color: white;
}
.title {
  text-align: center;
}

.custom-tabs-label {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  padding-left: 5px;
}

.aboutPWD {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.tabs {
  padding: 10px;
}

.checkIn {
  width: 100%;
  padding: 0;
}
</style>
