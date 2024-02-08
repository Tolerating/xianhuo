<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import useProductStore from '@/stores/product/index'
import { storeToRefs } from 'pinia';
const productStore = useProductStore()
const {sellModeList} = storeToRefs(productStore)
const props = defineProps<{mode:number}>()
const sellModeMap = reactive<string[]>([])

onMounted(()=>{
	sellModeMap.length = 0
	sellModeList.value.forEach(item=>{
		sellModeMap[item.id] = item.name
	})
})
</script>
<template>
    <view class="sell-mode-icon">
        <text>{{ sellModeMap[mode] }}</text>
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
