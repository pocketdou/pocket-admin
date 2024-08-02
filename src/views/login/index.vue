<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select"></lang-select>
      </div>

      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          name="username"
          placeholder="username"
          v-model="loginForm.username"
        >
          <template #prefix>
            <!-- <el-icon class="el-input__icon"><UserFilled /></el-icon> -->

            <span class="svg-container">
              <svg-icon icon="user"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          name="password"
          placeholder="password"
          show-password
          v-model="loginForm.password"
        >
          <template #prefix>
            <span class="svg-container">
              <!-- <el-icon><Lock /></el-icon> -->
              <svg-icon icon="password"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>

      <el-button
        style="width: 100%; margin-bottom: 30px; padding: 20px 0"
        type="primary"
        :loading="loading"
        @click="handleLogin"
      >
        {{ $t('msg.login.loginBtn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import LangSelect from '@/components/LangSelect'

import { validatePassword } from './rules'

const i18n = useI18n()
const store = useStore()
const router = useRouter()

const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

const loading = ref(false)

const loginFormRef = ref(null)

const handleLogin = () => {
  // 表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return

    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;

      .el-input__wrapper {
        height: 47px;
        background-color: transparent;
        .el-input__inner {
          color: $cursor;
        }

        .el-input__password {
          /* 调整小眼睛的大小 */
          font-size: 20px;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: white;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
