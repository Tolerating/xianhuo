<template>
  <view class="water-full-wrapper">
    <view class="top-fixed">
      <view v-if="statusBar" class="status_bar" :style="{height:statusBarHeight+'px'}">
        <slot name="statusBar"></slot>
      </view>
      <slot name="topFilter"></slot>
    </view>
    <slot></slot>
  </view>

</template>

<script lang="ts" setup>
import {ref} from "vue";
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
  width: 100%;
  background-color: white;
  .status_bar {
    background-color: #d4c9a7;
    //height: var(--status-bar-height);
  }

  .top-fixed {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10000;
  }
}
</style>