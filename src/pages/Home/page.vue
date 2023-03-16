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
		
			const embed = plus.webview.create('http://192.168.31.111:8000/#/stock');
	
			embed.addEventListener('loaded', function() {
				
				// const token = getApp().globalData.token
			
				// const baseUrl = getApp().globalData.baseUrl
				
				// embed.evalJS(`window.token=${JSON.stringify(getApp().globalData)}`);
				
				embed.evalJS(`window.globalData=${JSON.stringify(getApp().globalData)}`);
				
				// embed.evalJS(`window.init(${JSON.stringify(getApp().globalData)})`);
				
				embed.show();
				
			}, false);



		},
		methods: {}
	}
</script>
