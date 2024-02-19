import type { ChatMessage } from "@/types/ChatMessage";
import useUserStore from '@/stores/users/index' 
import { ref } from "vue";
const userStore = useUserStore()
export function useWebsocket() {
    const intervalId = ref()
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
        uni.onSocketError(function (res) {
            console.log('WebSocket连接打开失败，请检查！');
        });
    }

    const closeWebsocket = ()=>{
        uni.onSocketOpen(function () {
            uni.closeSocket();
          });
          uni.onSocketClose(res=>{
            console.log("websocket连接关闭");
            intervalId.value()
          })
    }
    return {
        connnectWebSocket,
        closeWebsocket
    }
}