import { defineStore } from "pinia";
import type { DiscoveryType } from "@/types/common";
import { reactive, ref } from "vue";
import type { SocketTask } from "@/types/SocketTask";
import { APP_BASE_URL, APP_URL_PORT } from "@/config";
import useUserStore from './users/index'
const useCommonStore = defineStore("common", () => {
	const userStore = useUserStore()
	//主页瀑布流触底标识
	const reachBottom = ref<boolean>(false);
	// 主页重新获取数据标识
	const homeRefesh = ref<boolean>(false);
	const updateReachBottom = (val : boolean) => {
		reachBottom.value = val;
	};
	const currentTab = reactive<DiscoveryType>({
		id: 0,
		title: "最新发布",
		type: 0,
	});
	const updateCurrentTab = (val : DiscoveryType) => {
		Object.assign(currentTab, val);
	};
	const inChat = ref<boolean>(false)
	// 未读官方通知数量
	const unreadNotices = ref<number>(0);
	const socket = ref<SocketTask | null>(null);
	const socketOpen = ref<boolean>(false);

	const tabList = reactive<DiscoveryType[]>([
		{ id: 0, title: "最新发布", type: 0 },
		// { id: 1, title: "物品出租",type:1 },
		// { id: 2, title: "物品出售",type:1 },
		{ id: 3, title: "宿舍神器", type: 2 },
		{ id: 4, title: "书籍资料", type: 2 },
		{ id: 5, title: "数码产品", type: 2 },
		{ id: 6, title: "运动健身", type: 2 },
	]);
	// 心跳定时器
	let heartInterval : any = null;
	// 重连定时器
	let reconnectInterval:any = null
	const closeSocket = () => {
		if (socket.value) {
			socket.value.close();
			socket.value.onClose(() => {
				clearInterval(heartInterval);
				socket.value = null;
				socketOpen.value = false;
				console.log("关闭连接");
			});
		}
	};
	/**
	 * 初始化socket
	 *
	 * @param {string} userId
	 */
	var initSocket = (userId : string) => {
		closeSocket()
		socket.value = uni.connectSocket({
			url: `ws://${APP_BASE_URL.replace(
				"http://",
				""
			)}:${APP_URL_PORT}/websocket/${userId}`,
			success() { },
		});
		socket.value.onOpen(() => {
			console.log("socket连接成功");
			socketOpen.value = true;
			clearInterval(reconnectInterval)
			clearInterval(heartInterval)
			heartInterval = setInterval(() => {
				uni.sendSocketMessage({
					data: "heart keep",
					fail() {
						console.log("心跳失败",userId);
						// 重连socket
						clearInterval(heartInterval)
						if(userStore.userInfo.id){
							reconnectInterval = setInterval(()=>{
								initSocket(String(userStore.userInfo.id))
							},2000)
						}
						
					}
				});
			}, 1000 * 5);
		});
		socket.value.onMessage((res : any) => {
			let receive = JSON.parse(res.data);
			console.log("服务端消息", receive);
			// #ifdef APP-PLUS
			if (receive.type == "chat") {
				console.log(typeof receive.notice);
				if (receive.notice && !inChat.value) {
					uni.createPushMessage({
						title: receive.senderName,
						content: receive.content,
						sound: "system"
					})
				}

			} else {
				unreadNotices.value++
				uni.createPushMessage({
					title: receive.title,
					content: receive.content,
					sound: "system"
				})
			}

			// #endif
			uni.setTabBarBadge({
				index: 2,
				text: "",
			});
		});
		socket.value.onError(() => {
			socketOpen.value = false;
			uni.showToast({
				title: "Socket连接打开失败，请检查网络或重启应用！",
				icon:"none",
				duration:2000
			});
			// 重连socket
			clearInterval(reconnectInterval)
			clearInterval(heartInterval)
			reconnectInterval = setInterval(()=>{
				initSocket(String(userStore.userInfo.id))
			},2000)
		});
	};
	
	const updateTabList = (val : DiscoveryType) : void => {
		tabList.push(val);
	};

	return {
		reachBottom,
		updateReachBottom,
		tabList,
		updateTabList,
		currentTab,
		updateCurrentTab,
		currentScrollTop: 0,
		homeRefesh,
		socket,
		socketOpen,
		initSocket,
		closeSocket,
		unreadNotices,
		inChat
	};
});
export default useCommonStore;