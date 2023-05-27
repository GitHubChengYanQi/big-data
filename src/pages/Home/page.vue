<template>
  <view>

  </view>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      embed: {},
    }
  },
  mounted() {

    const embed = plus.webview.create('https://wx.zz2025.com/data/#/stock', 'stock', {
      hardwareAccelerated: true
    });

    embed.addEventListener('loaded', function () {

      const token = uni.getStorageSync('token');

      // const baseUrl = getApp().globalData.baseUrl

      // embed.evalJS(`window.token=${JSON.stringify(getApp().globalData)}`);

      embed.evalJS(`window.globalData=${JSON.stringify({baseUrl: getApp().globalData.baseUrl, token})}`);

      // embed.evalJS(`window.init(${JSON.stringify(getApp().globalData)})`);

      embed.show();

    }, false);


  },
  methods: {}
}
</script>
