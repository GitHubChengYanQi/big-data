<template>
  <view class="login">
    <view class="logo">
      <img src="../../static/logo2.png" alt="">
    </view>
    <view class="login2">
      <view class="text">欢迎使用浑河云</view>
      <view>
        <uni-forms>
          <uni-forms-item :label-width="40" label="账号">
            <uni-easyinput class="uni-input" name="username" v-model="username" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item :label-width="40" label="密码">
            <uni-easyinput class="uni-input" type="password" name="password" v-model="password" placeholder="请输入密码" />
          </uni-forms-item>
          <view class="uni-btn-v">
            <button :loading="loading" form-type="submit" type="default" @click="()=>submit()">立即登录</button>
          </view>
        </uni-forms>
      </view>
      <view class="technology">本小程序为沈阳浑河工业有限责任公司内部办公终端，请登录后使用。</view>
    </view>
  </view>
</template>
<script>

import {Login} from "MES-Apis/src/Login/promise";
import {getLocalParmas} from "@/util/Tools";


export default {
  components: {},
  data() {
    return {
      username: '',
      password: '',
      backUrl: '',
      mobile: true,
      loading: false
    }
  },
  created() {

  },
  mounted() {
    this.backUrl = getLocalParmas().search.backUrl
  },
  methods: {
    submit(url) {
      if (!this.username) {
        uni.showToast({
          icon: 'error',
          title: '账号不能为空',
          duration: 2000
        });
        return
      } else if (!this.password) {
        uni.showToast({
          icon: 'error',
          title: '密码不能为空',
          duration: 2000
        });
        return
      }
      this.loading = true
      Login.login({
        username: this.username,
        password: this.password
      }, {
        onSuccess: (res) => {
          this.$store.commit('userInfo/clear')
          getApp().globalData.token = res
          this.goBack(url)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    goBack(url) {
      uni.navigateTo({
        url: (url || this.backUrl)
      })
    }
  },
}
</script>

<style lang="scss">

.title {
  margin-right: 5px;
}

body {
  background-image: url('@/static/login.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

image {
  width: 100%;
  height: 100%;
}

.login {
  max-width: 500px;
  margin: auto;

  .logo {
    width: 87px;
    height: 87px;
    margin: auto;
  }

  .login2 {
    padding: 0 28px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.9);

    .uni-input {
      width: 100%;
      font-size: 14px;
      background-color: #e1ebf6;
    }

    .text {
      padding: 33px;
      text-align: center;
      font-size: 16px;
    }

    .login3 {
      display: flex;
      padding: 16px 7px;
      border-bottom: 1px solid #D9D9D9;
    }

    button {
      padding: 5px 0;
      font-size: 14px;
      color: #fff;
      background-color: #2680eb;
      margin: 27px 0 52px 0;
    }

    .forget {
      font-size: 12px;
      color: #999999;
      text-align: center;
    }

    .forget::before, .forget::after {
      content: '';
      display: inline-block;
      border-bottom: 1px solid #ACACAC;
      width: 43px;
      margin: 4px 16px;

    }

    .technology {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 39px;
      padding-bottom: 23px;

      .link {
        font-size: 12px;
        color: #2680eb;
      }
    }

    .uni-eye-active {
      color: #007AFF;
    }

    .uni-icon {
      font-family: uniicons;
      font-size: 24px;
      font-weight: normal;
      font-style: normal;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: #999999;
    }
  }
}

</style>
