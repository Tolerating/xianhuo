import { productRequireByDispatch } from "@/api/home/goods";
import type { ProductRequire } from "@/types/ProductRequire";
import { reactive } from "vue";

export function useProductRequire() {
    const productRequireList = reactive<ProductRequire[]>([])

    async function requestProductRequire(sellModeId: number, dispatchModeId: number) {
        let result = await productRequireByDispatch(sellModeId, dispatchModeId);
        productRequireList.length = 0
        productRequireList.push(...result.data)
        return result.data
    }
    return {
        productRequireList,
        requestProductRequire
    }
}