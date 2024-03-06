import { defineStore } from "pinia";
import type {DiscoveryType} from '@/types/common'
import { reactive, ref } from "vue";
const useCommonStore = defineStore("common", () => {

	//主页瀑布流触底标识
	const reachBottom = ref<boolean>(false)
	// 主页重新获取数据标识
	const homeRefesh = ref<boolean>(false)
	const updateReachBottom = (val : boolean) => {
		reachBottom.value = val
	}
	const currentTab = reactive<DiscoveryType>({ id: 0, title: "最新发布",type:0 })
	const updateCurrentTab = (val : DiscoveryType) => {
		Object.assign(currentTab,val)
	}

	const tabList = reactive<DiscoveryType[]>([
		{ id: 0, title: "最新发布",type:0 },
		// { id: 1, title: "物品出租",type:1 },
		// { id: 2, title: "物品出售",type:1 },
		{ id: 3, title: "宿舍神器",type:2 },
		{ id: 4, title: "书籍资料",type:2 },
		{ id: 5, title: "数码产品",type:2 },
		{ id: 6, title: "运动健身",type:2 }
		
	])
	const updateTabList = (val : DiscoveryType) : void => {
		tabList.push(val)
	}
	
	return {
		reachBottom,
		updateReachBottom,
		tabList,
		updateTabList,
		currentTab,
		updateCurrentTab,
		currentScrollTop: 0,
		homeRefesh
	}
})
export default useCommonStore