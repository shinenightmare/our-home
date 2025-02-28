<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { getInfo } from "@/service/api/login";
import { infoResponse } from "@/service/interface/res";

const formRef = ref<FormInstance>();
const loginForm = reactive({
  username: "",
  password: "",
  rCode: "",
});

const isLogin = ref(true);
const taggleForm = () => {
  isLogin.value = !isLogin.value;
};

function loginUser() {
  getInfo({ planId: loginForm.username, annually: loginForm.password }).then(
    (res) => {
      loginForm.rCode = res;
    }
  );
}
</script>
<template>
  <div class="login">
    <div class="container">
      <div class="title">
        <h1>{{ isLogin ? "登录" : "注册" }}</h1>
      </div>
      <div v-if="isLogin">
        <div>
          <el-form
            ref="formRef"
            :model="loginForm"
            label-width="30%"
            class="loginForm"
          >
            <el-form-item
              label="用户名"
              prop="username"
              :rules="[
                {
                  required: true,
                  message: 'Please input username',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                type="text"
                v-model="loginForm.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                {
                  required: true,
                  message: 'Please input password',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                type="text"
                v-model="loginForm.password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item
              label="验证码"
              :rules="[
                {
                  required: true,
                  message: 'Please input rcode',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="loginForm.rCode" />
            </el-form-item>
            <div class="centerLay">
              <el-button type="primary" @click="loginUser()" round>
                Submit
              </el-button>
              <el-button type="primary" @click="resetForm()" round
                >Reset</el-button
              >
            </div>
          </el-form>
        </div>
        <div class="ToRegist">
          <el-button link @click="taggleForm"
            >register<el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
      <div v-if="!isLogin">
        <div>注册页面</div>
        <div>
          <div class="backLogin">
            <el-button link @click="taggleForm"
              ><el-icon><ArrowLeft /></el-icon>back
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url("../../assets/login/loginbackgroud.jpg");
  position: relative;
  display: flex;
}
.container {
  width: 500px;
  height: 400px;
  background: #fff;
  margin: auto;
  border: 2px solid #fff;
  box-shadow: 0 15px 40px rgba(242, 1, 1, 0.5);
  border-radius: 5%;
  position: relative;
}
.title {
  text-align: center;
  margin-top: 10px;
}
.loginForm {
  width: 400px;
  margin: 20px auto auto auto;
}
.centerLay {
  text-align: center;
  width: 100%;
}
.ToRegist {
  position: absolute;
  right: 0;
  bottom: 10px;
}
.backLogin {
  position: absolute;
  left: 0;
  bottom: 10px;
}
</style>
