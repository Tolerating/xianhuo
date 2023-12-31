import { defineStore } from "pinia";
import type {DiscoveryType} from '@/types/common'

const useCommonStore = defineStore("common", {
	state() {
		return {
			currentScrollTop: 0,
			reachBottom: false,
			currentTab: { id: 0, title: "最新发布" },
			tabList: [
				{ id: 0, title: "最新发布" },
				{ id: 1, title: "猜你喜欢" },
				{ id: 2, title: "以物换物" },
				{ id: 3, title: "物品出租" },
				{ id: 4, title: "物品出售" },
				{ id: 5, title: "二手书籍" },
				{ id: 6, title: "电子产品" },
			]
		}
	},
	actions: {
		updateReachBottom(val : boolean) {
			this.reachBottom = val
		},
		updateCurrentTab(val : DiscoveryType) {
			this.currentTab.id = val.id
			this.currentTab.title = val.title
		},
		updateTabList(val : DiscoveryType) : void {
			this.tabList.push(val)
		}
	}
})

// const useCommonStore = defineStore("common", () => {

// 	//主页瀑布流触底标识
// 	const reachBottom = ref<boolean>(false)
// 	const updateReachBottom = (val : boolean) => {
// 		reachBottom.value = val
// 	}
// 	const currentTab = ref<DiscoveryType>({ id: 0, title: "最新发布" })
// 	const updateCurrentTab = (val : DiscoveryType) => {
// 		currentTab.value.id = val.id
// 		currentTab.value.title = val.title
// 	}

// 	const tabList = reactive<DiscoveryType[]>([
// 		{ id: 0, title: "最新发布" },
// 		{ id: 1, title: "猜你喜欢" },
// 		{ id: 2, title: "以物换物" },
// 		{ id: 3, title: "物品出租" },
// 		{ id: 4, title: "物品出售" },
// 		{ id: 5, title: "二手书籍" },
// 		{ id: 6, title: "电子产品" },
// 	])
// 	const updateTabList = (val : DiscoveryType) : void => {
// 		tabList.push(val)
// 	}
// 	return {
// 		reachBottom,
// 		updateReachBottom,
// 		tabList,
// 		updateTabList,
// 		currentTab,
// 		updateCurrentTab,
// 		currentScrollTop: 0
// 	}
// })


// const store = reactive({
// 			currentScrollTop: 0,
// 			reachBottom: false,
// 			currentTab: { id: 0, title: "最新发布" },
// 			tabList: [
// 				{ id: 0, title: "最新发布" },
// 				{ id: 1, title: "猜你喜欢" },
// 				{ id: 2, title: "以物换物" },
// 				{ id: 3, title: "物品出租" },
// 				{ id: 4, title: "物品出售" },
// 				{ id: 5, title: "二手书籍" },
// 				{ id: 6, title: "电子产品" },
// 			]
// 		})

// const useCommonStore= ()=>store	
export default useCommonStore