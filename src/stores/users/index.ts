import type { User } from '@/types/Users'
import {defineStore} from 'pinia'
import {ref,reactive} from 'vue'
import {releasedCount, requestUserInfo} from '@/api/user/user'
import {getInfoCount} from "@/api/home/require"
import {APP_BASE_URL} from '@/config/index'
import {favouriteCount} from '@/api/home/goods'

const useUserStore = defineStore("user",()=>{
	// 用户个人信息
	const userInfo = reactive<User>({} as User)
	// token
	const authorization = ref<string | null>(null)
	// 我的页面，收藏、发布商品、帖子数量
	const counts = reactive<{star:number,released:number,article:number}>({
		star:0,
		released:0,
		article:0
	})
	
	function updateAuthorization(value:string):void{
		authorization.value = value
	}
	function deleteAuthorization(){
		authorization.value = ''
	}
	async function getUserInfo(){
		const result = await requestUserInfo()
		Object.assign(userInfo,result.data)
		userInfo.avatar = APP_BASE_URL + userInfo.avatar
		return result.data

	}
	async function initCounts() {
		const released = await releasedCount()
		const star = await favouriteCount()
		const article = await getInfoCount()
		counts.released = released.data
		counts.star = star.data
		counts.article = article.data
		
	}
	return{
		userInfo,
		authorization,
		counts,
		deleteAuthorization,
		updateAuthorization,
		getUserInfo,
		initCounts
	}
},{
	persist:{
		key:"xh_user",
		paths:['authorization',"userInfo"],
		storage:{
			setItem(key,value) {
				uni.setStorageSync(key,value)
			},
			getItem(key) {
				return uni.getStorageSync(key)
			}
		}
		
	}
})
export default useUserStore
