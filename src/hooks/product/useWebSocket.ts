import type { ChatMessage } from "@/types/ChatMessage";
import useUserStore from '@/stores/users/index' 
import { ref } from "vue";
import { clearInterval } from "timers";
const userStore = useUserStore()
export function useWebsocket() {
    const intervalId = ref<any>(null)
	const reconnectInterval = ref<any>(null)
    const connnectWebSocket = () => {
        uni.connectSocket({
            url: `ws://localhost:8080/websocket/${userStore.userInfo.id}`,
        })
        uni.onSocketOpen(() => {
            console.log("socket连接成功");
            intervalId.value = setInterval(()=>{
                uni.sendSocketMessage({
                    data:"heart keep"
                })
            },1000*30)
        })
    }
	
	uni.onSocketError(function (res) {
	    console.log('WebSocket连接打开失败，请检查！');
		reconnectInterval.value = setInterval(()=>{
			if(intervalId.value){
				clearInterval(reconnectInterval.value)
				reconnectInterval.value = null
			}else{
				connnectWebSocket()
			}
		},2000)
	});

    const closeWebsocket = ()=>{
        uni.onSocketOpen(function () {
            uni.closeSocket();
          });
          uni.onSocketClose(res=>{
            console.log("websocket连接关闭");
            clearInterval(intervalId.value)
			intervalId.value = null
          })
    }
    return {
        connnectWebSocket,
        closeWebsocket
    }
}