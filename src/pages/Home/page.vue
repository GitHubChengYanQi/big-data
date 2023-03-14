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
   const embed = plus.webview.create('http://192.168.31.111:8003/#/stock','stock',{},{token:getApp().globalData.token});
   this.embed = embed
   embed.show();
    
 
  },
  methods: {
	  
  }
}
</script>
