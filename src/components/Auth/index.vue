<template>
  <view>
    <view v-if="loading">loading...</view>
    <view v-else-if="error">error</view>
    <slot v-else></slot>
  </view>
</template>

<script>
import GetUserInfo from "../../util/GetUserInfo";
import {Login} from "MES-Apis/src/Login/promise";
import {getLocalParmas} from "../../util/Tools";

export default {
  name: 'Auth',
  props: {
    auth: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      loading: false,
      error: false,
      height: 0
    }
  },
  mounted() {
    this.authInfo()
  },
  methods: {
    async authInfo() {
      this.loading = true
      try {

        await this.$store.dispatch('userInfo/getPublicInfo')

        if (!this.auth) {
          this.authSuccess()
          return
        }

        const token = GetUserInfo().token;

        if (token) {
          this.tokenAuth()
        } else {
          uni.navigateTo({
            url: `/pages/login/index?backUrl=${getLocalParmas().route}`,
          })
        }
      } catch (e) {
        this.authError()
      }
    },
    async tokenAuth() {
      await this.getSystemInfo()
      this.authSuccess()
    },
    authSuccess() {
      this.$store.commit('userInfo/authStatus', true)
      this.$store.commit('userInfo/refresh', false)
      this.loading = false
    },
    authError() {
      this.$store.commit('userInfo/authStatus', false)
      this.$store.commit('userInfo/refresh', false)
      this.loading = false
      this.error = true
      // this.authSuccess()
    },
    async getSystemInfo() {
      await this.$store.dispatch('userInfo/getUserInfo')
    }
  }
}
</script>
