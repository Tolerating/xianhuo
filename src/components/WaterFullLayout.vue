<template>
  <view class="water-full-wrapper">
    <view class="top-fixed">
      <view v-if="statusBar" class="status_bar" :style="{ height: statusBarHeight + 'px' }"></view>
      <slot name="navigateBar"></slot>
      <slot name="topFilter"></slot>
    </view>
    <slot></slot>
    <view class="bottom-fixed">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let StatusBarHeight = Number(uni.getSystemInfoSync().statusBarHeight);
const statusBarHeight = ref<number>(StatusBarHeight)
const props = withDefaults(defineProps<{
  statusBar?: boolean
}>(), {
  statusBar: false
})

</script>

<style lang="scss" scoped>
$icon-size: 25px;

.water-full-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-start;
  padding: 0 $xianhuo-padding-LR;
  width: 100%;
  background-color: white;

  .bottom-fixed {
    background-color: white;
    position: sticky;
    bottom: 0;
    // right: 0;
    // left: 0;
  }

  .top-fixed {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;

    .status_bar {
      background-color: white;
      //height: var(--status-bar-height);
    }
  }
}
</style>