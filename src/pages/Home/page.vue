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
    const w = plus.webview.create('http://192.168.2.111:8000/#/stock');
    this.embed = w
    w.show(); // 显示窗口
    const token = getApp().globalData.token
    w.evalJS(`window.token = ${token}`);
  },
  methods: {}
}
</script>
