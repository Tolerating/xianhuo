<script lang="ts" setup>
import useProductStore from '@/stores/product';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const store = useProductStore()
const {categoryList} = storeToRefs(store)
const emits = defineEmits<{
    (e: "change", categoryId: number): void
}>()
const categoryPopup = ref()
const show = () => {
    categoryPopup.value.open()
}
const props = defineProps<{
    categoryId: number,
    type:string
}>()
defineExpose({
    show
})
</script>
<template>
    <uni-popup ref="categoryPopup" :type="type">
        <view class="goods-category-container">
            <view :class="{ 'category-selected': item.id == categoryId }" class="category-item "
                v-for=" item  in  categoryList " @tap="$emit('change', item.id)" :key="item.id">
                {{ item.name }}
            </view>
        </view>
    </uni-popup>
</template>
<style lang="scss" scoped>
.goods-category-container {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    padding: 30px 10px 150px 10px;
    column-gap: 5px;

    .category-item {
        background-color: rgba($color: $xh-color-info, $alpha: .4);
        border-radius: 15px;
        padding: 5px;
        text-align: center;
        flex: 0 0 calc(85%/3)
    }

    .category-item.category-selected {
        background-color: rgba($color: $xh-color-primary, $alpha: .6);
        color: $xh-text-color-highlight;
    }
}
</style>
