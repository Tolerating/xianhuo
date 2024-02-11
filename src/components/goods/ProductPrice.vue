<script lang="ts" setup>
const props = defineProps<{ mode: number, currentPrice: string, originPrice: string, timeUnit: string }>()
</script>
<template>
    <view class="goods-price">
        <text style="margin-right: 20px;">￥{{ mode == 1 ? currentPrice : currentPrice + "/" + timeUnit }}</text>
        <text style="text-decoration: line-through;" v-if="parseFloat(originPrice) != 0">原价：￥{{ originPrice }}</text>
    </view>
</template>
<style lang="scss" scoped>
.goods-price {
    margin-top: 2px;

    text {
        color: red;
    }
}
</style>
