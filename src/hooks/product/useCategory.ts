import { allCategories } from "@/api/home/goods";
import type { Category } from "@/types/Category";
import { reactive } from "vue";

export function useCategory() {
    // 存放商品分类
    const categoryList = reactive<Category[]>([])
    async function requestCategory():Promise<Category[]>{
        // 获取分类
        const category = await allCategories();
        categoryList.push(...category.data)
        return new Promise((resolve,reject)=>{
            resolve(category.data)
        })
    }

    return {
        categoryList,
        requestCategory
    }
}