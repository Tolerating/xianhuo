import type { UserPart } from "@/types/Users";
import { reactive, readonly } from "vue";
import {userInfoById} from '@/api/user/user'
import {APP_BASE_URL} from '@/config/index'

export function usePartUserInfo(){
    const partUserInfo = reactive<UserPart>({
        id:0,
        name:"",
        school:"",
        avatar:"",
        location:""
    })

    async function requestPartUserInfo(uId:number){
        const result = await userInfoById(uId)
        Object.assign(partUserInfo,result.data)
        partUserInfo.avatar = APP_BASE_URL + partUserInfo.avatar 
    }
    return{
        partUserInfo,
        requestPartUserInfo
    }
}