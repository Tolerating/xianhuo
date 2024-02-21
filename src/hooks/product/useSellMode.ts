import { allSellMode } from "@/api/home/goods";
import type { SellMode } from "@/types/SellMode";
import { reactive } from "vue";

export function useSellMode(){
    const sellModeList = reactive<SellMode[]>([])

    async function requestSellMode(){
        const sellmodes = await allSellMode();
        sellModeList.length = 0
        sellModeList.push(...sellmodes.data)
        return sellmodes.data
    }

    return{
        sellModeList,
        requestSellMode
    }

}