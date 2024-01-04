<template>
	<WaterFullLayout :statusBar="true">
		<template #navigateBar>
			<view class="navigate-bar" >
				<view>
					<text class="navigate-bar-title">消息</text>
					<view class="xh-btn-group">
						<uni-icons
							type="trash-filled"
							color="gray"
							size="16"
						/>
						清除未读
					</view>
				</view>
				<uni-icons
					type="gear-filled"
					color="gray"
					size="24"
				/>
			</view>
			<view class="top">
				<view class="cd"></view>
			</view>
		</template>
	</WaterFullLayout>
</template>

<script lang="ts" setup>
import WaterFullLayout from '@/components/WaterFullLayout.vue'
</script>

<style lang="scss" scoped>
.navigate-bar{
	background-color: white;
	display: flex;
	padding: 0 $xianhuo-padding-LR;
    .navigate-bar-title {
		font-size: 24px;
		font-weight: bold;
    }
    .xh-btn-group {
		background-color: $xh-theme-color-50;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 10px;
		font-size: 16px;
		color: $xh-text-color-C;
    }

}
.top {
    .cd {
    }
}
</style>