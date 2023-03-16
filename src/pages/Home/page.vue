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
	  console.log(getApp().globalData.baseUrl)
    const embed = plus.webview.create('https://wx.zz2025.com/data/#/stock', 'stock', {}, {
      token: getApp().globalData.token,
      baseURI: getApp().globalData.baseUrl,
    });
    this.embed = embed
    embed.show();


  },
  methods: {}
}
</script>
