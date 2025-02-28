<template>
  <el-form
    ref="accountFormRef"
    class="demo-ruleForm"
    :model="accountForm"
    label-width="15%"
    :rules="rules"
  >
    <el-form-item label="账号" prop="account">
      <el-input
        type="text"
        v-model="accountForm.account"
        placeholder="please input account name"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="accountForm.password"
        type="password"
        placeholder="please input password"
        show-password
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import userLoginStore from "@/store/login/login";
import { localCache } from "@/utils/cache";
import { USER_ACCOUNT, USER_PASSWORD } from "@/global/constants";
interface AccountForm {
  account: string;
  password: string;
}

const accountFormRef = ref<FormInstance>();
const accountForm = reactive<AccountForm>({
  account: localCache.getCache(USER_ACCOUNT) ?? "",
  password: localCache.getCache(USER_PASSWORD) ?? "",
});

const rules = reactive<FormRules<AccountForm>>({
  account: [
    { required: true, message: "Please input account name", trigger: "blur" },
    { min: 3, max: 18, message: "Length should be 3 to 18", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
    { min: 6, max: 12, message: "Length should be 6 to 12", trigger: "blur" },
  ],
});

const loginStore = userLoginStore();

function accountLogin(rememberPwd: boolean) {
  accountFormRef.value?.validate((valid) => {
    if (valid) {
      loginStore
        .loginByAccount({
          accountName: accountForm.account,
          password: accountForm.password,
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: "error",
            plain: true,
          });
        });
      if (rememberPwd) {
        localCache.setCache(USER_ACCOUNT, accountForm.account);
        localCache.setCache(USER_PASSWORD, accountForm.password);
      } else {
        localCache.removeCache(USER_ACCOUNT);
        localCache.removeCache(USER_PASSWORD);
      }
    } else {
      console.log("error submit!");
    }
  });
}

defineExpose({
  accountLogin,
});
</script>
<style scoped>
.demo-ruleForm {
  height: 100px;
}
</style>
