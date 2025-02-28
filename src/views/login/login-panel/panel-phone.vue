<template>
  <div class="panel-phone">
    <el-form label-width="15%">
      <el-form-item label="手机号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <el-button class="get-code"> 获取验证码 </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>
<style scope>
.panel-phone {
  height: 100px;
}
.verify-code {
  display: flex;
  width: 100%;

  .get-code {
    margin-left: 6px;
    margin-right: 0px;
  }
}
</style>
