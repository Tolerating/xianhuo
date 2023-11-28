<template>
	
	<view class="home-index-wrapper">
		<view class="home-index-organization">
			<image src="../../static/tabbar/home.png" mode=""></image>
			<text>浙江万里学院</text>
		</view>
		
	</view>

</template>

<script lang="ts" setup>
	
</script>

<style lang="scss" scoped>
$icon-size:20px;
.home-index-wrapper{
	display: flex;
	position: fixed;
	top:var(--status-bar-height);
	bottom: 0;
	flex-direction: column;
	width: 100%;
	// background-color: white;
		background-color: skyblue;
	.home-index-organization{
		$line-height:30px;
		display: flex;
		height: $line-height;
		background-color:red;
		line-height: $line-height;
		image{
			width: $icon-size;
			height:$icon-size;
			vertical-align: middle;
		}
		text{
			
		}
	}
}

</style>