<script lang="ts" setup>

type SellMode = "出售" | "出租" | "交换";
const props = defineProps<{type:SellMode}>()
</script>
<template>
    <view class="sell-mode-icon">
        <text>{{ type }}</text>
    </view>
</template>
<style lang="scss" scoped>
.sell-mode-icon{
    text{
        background-color: rgba($color:$xh-theme-color-500, $alpha: .7);
        font-size: $xh-font-size-lg;
        padding: 5px;
        border-radius: 5px;
    }
}
</style>
