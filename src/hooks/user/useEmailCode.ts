import {getCheckCode} from '@/api/user/login'
export function useEmailCode(){
    async function requestEmailCode(email:string){
        const result = await getCheckCode(email)
        console.log(result.data);
        return result.data
        
    }
    return{
        requestEmailCode
    }
}