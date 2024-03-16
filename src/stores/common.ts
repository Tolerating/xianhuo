import { defineStore } from "pinia";
import type { DiscoveryType } from "@/types/common";
import { reactive, ref } from "vue";
import type { SocketTask } from "@/types/SocketTask";
import { APP_BASE_URL, APP_URL_PORT } from "@/config";
const useCommonStore = defineStore("common", () => {
  //主页瀑布流触底标识
  const reachBottom = ref<boolean>(false);
  // 主页重新获取数据标识
  const homeRefesh = ref<boolean>(false);
  const updateReachBottom = (val: boolean) => {
    reachBottom.value = val;
  };
  const currentTab = reactive<DiscoveryType>({
    id: 0,
    title: "最新发布",
    type: 0,
  });
  const updateCurrentTab = (val: DiscoveryType) => {
    Object.assign(currentTab, val);
  };
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
  let heartInterval: any = null;
  /**
   * 初始化socket
   *
   * @param {string} userId
   */
  const initSocket = (userId: string) => {
    socket.value = uni.connectSocket({
      url: `ws://${APP_BASE_URL.replace(
        "http://",
        ""
      )}:${APP_URL_PORT}/websocket/${userId}`,
      success() {},
    });
    socket.value.onOpen(() => {
      console.log("socket连接成功");
      socketOpen.value = true;
      heartInterval = setInterval(() => {
        uni.sendSocketMessage({
          data: "heart keep",
        });
      }, 1000 * 30);
    });
	socket.value.onMessage((res: any) => {
        console.log("服务端消息", res.data);
        let receive = JSON.parse(res.data)
        if(receive.showType == "chat"){
			
		}
		uni.setTabBarBadge({
			index: 2,
			text: ""
		})

    })
    socket.value.onError(() => {
      socketOpen.value = false;
      uni.showToast({
        title: "连接打开失败，请检查网络！",
      });
    });
  };
  const closeSocket = () => {
    if (socket.value) {
      socket.value.close();
      socket.value.onClose(() => {
        clearInterval(heartInterval);
		socket.value = null
		socketOpen.value = false
        console.log("关闭连接");
      });
    }
  };
  const updateTabList = (val: DiscoveryType): void => {
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
	closeSocket
  };
});
export default useCommonStore;
