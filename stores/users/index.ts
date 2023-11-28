import {defineStore} from 'pinia'
import {ref,reactive} from 'vue'

const useUserStore = defineStore("user",()=>{
	const userInfo = reactive({})
	const authorization = ref<string>(null)
	function updateAuthorization(value:string):void{
		authorization.value = value
	}
	function deleteAuthorization(){
		authorization.value = ''
	}
	return{
		userInfo,
		authorization,
		deleteAuthorization,
		updateAuthorization
	}
},{
	persist:{
		key:"xh_user",
		paths:['authorization'],
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
