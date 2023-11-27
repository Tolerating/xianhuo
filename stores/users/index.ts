import {defineStore} from 'pinia'
import { reactive } from 'vue-demi'

const useUserStore = defineStore("user",()=>{
	const userInfo = reactive({})
	
	return{
		userInfo
	}
},{
	persist:{
		enabled:true
	}
})
export default useUserStore
