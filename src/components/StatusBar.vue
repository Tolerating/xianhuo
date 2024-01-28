<script lang="ts" setup>
import { ref } from 'vue';
const statusBarHeight = ref<number>(Number(uni.getSystemInfoSync().statusBarHeight));
</script>
<template>
    <view :style="{ height: statusBarHeight + 'px',backgroundColor:'white' }"></view>
</template>
<style lang="scss" scoped>

</style>
