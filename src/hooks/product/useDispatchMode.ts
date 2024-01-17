import { dispatchModeBySell } from "@/api/home/goods";
import type { DispatchMode } from "@/types/DispatchMode";
import { reactive } from "vue";

export function useDispatchMode() {
    const dispatchModeList = reactive<DispatchMode[]>([])

    async function requestDispatchMode(sellModeId: number) {
        const result = await dispatchModeBySell(sellModeId)
        dispatchModeList.length = 0
        dispatchModeList.push(...result.data)
        return result.data
    }
    return{
        dispatchModeList,
        requestDispatchMode
    }
}