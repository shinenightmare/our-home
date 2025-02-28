<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script setup lang="ts">
import loginPanel from "./login-panel/login-panel.vue";
</script>
<style scope>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-image: url("/src/assets/image/2025010901.png");
}
</style>
