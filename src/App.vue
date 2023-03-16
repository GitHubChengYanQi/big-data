<script>
import {Init} from "MES-Apis/src/Init";
import {getLocalParmas} from "./util/Tools";

const baseUrl = 'https://api.hh.zz2025.com'
Init.initBaseURL(baseUrl)


export default {
  onLaunch: function () {
    const updateManager = uni.getUpdateManager();

    updateManager.onUpdateReady(function () {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });

    });
    this.appInit();
  },
  onShow: function () {

  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
    appInit() {
      getApp().globalData.baseUrl = baseUrl
      Init.responseConfig({
        loginTimeOut: () => {
          uni.showToast({
            icon: 'error',
            title: '您已登录超时!\n正在重新登录...',
            duration: 2000
          });
          setTimeout(()=>{
            getApp().globalData.token = ''
            // this.$store.commit('userInfo/clear')
            uni.reLaunch({
              url: getLocalParmas().route,
            });
            // this.$store.commit('userInfo/refresh', true)
          },2000)
        },
        errorMessage: (res) => {
          uni.showToast({
            icon: 'error',
            title: res,
            duration: 2000
          });
        },
      })
    }
  },
  globalData: {
    token: ''
  }
}
</script>
