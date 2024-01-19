import type { SellMode } from "@/types/SellMode";
import { defineStore } from "pinia";
import { reactive } from "vue";
import {useSellMode} from '@/hooks/product/useSellMode'
import { useCategory } from "@/hooks/product/useCategory";
import { useDispatchMode } from "@/hooks/product/useDispatchMode";
import type { DispatchMode } from "@/types/DispatchMode";
import {allDispatchMode,allProductRequire} from '@/api/home/goods'
import type { ProductRequire } from "@/types/ProductRequire";
const useProductStore =  defineStore("product",()=>{
    const {sellModeList,requestSellMode} = useSellMode()
    const {categoryList,requestCategory} = useCategory()
    const dispatchModeList = reactive<DispatchMode[]>([])
    const productRequireList = reactive<ProductRequire[]>([])
    const categoryNameById = (cId:number):string | undefined=>{
        return categoryList.find((value)=>{
            return value.id == cId
        })?.name
    }

    const requestAllDispatchMode = async ()=>{
        const result = await allDispatchMode()
        dispatchModeList.length = 0
        dispatchModeList.push(...result.data)
        return result.data
    }

    const requestAllProductRequire = async ()=>{
        const result = await allProductRequire()
        productRequireList.length = 0
        productRequireList.push(...result.data)
        return result.data
    }

    // 根据发货id获取发货方式名字
    const dispatchModeNameById = (dispatchId:number):string | undefined=>{
        return dispatchModeList.find(value=>value.id==dispatchId)?.name
    }
    const productRequireNameById = (id:string[]):string[]=>{
        let result:string[] = []
        id.forEach(item=>{
            result.push(productRequireList.find(value=>value.id == Number(item))?.name || "")
        })
        return result
    }
    return{
        sellModeList,
        requestSellMode,
        categoryList,
        requestCategory,
        categoryNameById,
        dispatchModeList,
        requestAllDispatchMode,
        dispatchModeNameById,
        productRequireList,
        requestAllProductRequire,
        productRequireNameById
    }
    
},{
    persist:{
        key:"xh_product",
        storage:{
            setItem(key, value) {
                uni.setStorageSync(key,value)
            },
           getItem(key){
                return uni.getStorageSync(key)
           }
            
        }       
    }
})
export default useProductStore