import type { User } from '@/types/Users'
import {defineStore} from 'pinia'
import {ref,reactive} from 'vue'
import {requestUserInfo} from '@/api/user/user'

const useUserStore = defineStore("user",()=>{
	const userInfo = reactive<User | {}>({})
	const authorization = ref<string | null>(null)

	function updateAuthorization(value:string):void{
		authorization.value = value
	}
	function deleteAuthorization(){
		authorization.value = ''
	}
	async function getUserInfo(){
		const result = await requestUserInfo()
		Object.assign(userInfo,result.data)
		return result.data

	}
	return{
		userInfo,
		authorization,
		deleteAuthorization,
		updateAuthorization,
		getUserInfo
	}
},{
	persist:{
		key:"xh_user",
		paths:['authorization',"userInfo"],
		storage:{
			setItem(key,value) {
				console.log("setitem",value)
				uni.setStorageSync(key,value)
			},
			getItem(key) {
				return uni.getStorageSync(key)
			}
		}
		
	}
})
export default useUserStore
