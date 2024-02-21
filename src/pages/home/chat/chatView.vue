<script lang="ts" setup>
import { reactive } from 'vue';
import { nextTick, ref, onMounted } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import { useNow, useDateFormat } from '@vueuse/core'
import useUserStore from '@/stores/users';
import { storeToRefs } from 'pinia';
import type { SocketTask } from '@/types/SocketTask';
import { pageChatMessage, clearUnRead,allMessages } from '@/api/chat/index'
import type { ChatMessage } from '@/types/ChatMessage';
import { APP_BASE_URL, APP_URL_PORT } from '@/config/index'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const toUser = reactive<{ toUserId: string, toUserName: string, toUserPicture: string }>({
    toUserId: "",
    toUserName: "",
    toUserPicture: ""
})
// 聊天关系id
const linkId = ref<string>("")
// 未读消息数量
const unread = ref<number>(0)
const inputValue = ref<string>("")
let heartInterval: any = null
const socket = ref<SocketTask | null>(null)
const isFocus = ref<boolean>(false)
const isSend = ref<boolean>(false)
const messageList = reactive<ChatMessage[]>([])
const scrollIntoView = ref<string>("msg" + (messageList.length - 1))

let socketOpen: boolean = false

const initWebsocket = () => {

    socket.value = uni.connectSocket({
        url: `ws://${APP_BASE_URL.replace("http://","")}:${APP_URL_PORT}/websocket/${userStore.userInfo.id}`,
        success() { }
    })
    socket.value.onOpen(() => {
        console.log("socket连接成功");
        heartInterval = setInterval(() => {
            uni.sendSocketMessage({
                data: "heart keep"
            })
        }, 1000 * 30)
    })
    socket.value.onMessage((res: any) => {
        console.log("服务端消息", res.data);
        let receive = JSON.parse(res.data)
        if (receive.sendUser == toUser.toUserId) {
            messageList.push({
                scrollId: messageList.length,
                content: receive.content,
                toUser: String(userInfo.value.id),
                fromUser: toUser.toUserId,
                linkId: linkId.value,
                sendTime: useDateFormat(useNow(), "YYYY-MM-DD HH:mm").value
            })
            nextTick(() => {
                scrollIntoView.value = 'msg' + (messageList.length - 1)
            })
            scrollIntoView.value = ''
        }

    })
    socket.value.onError(() => {
        isSend.value = true
        uni.showToast({
            title:"连接打开失败，请检查网络！"
        })
    })
}
onLoad(option => {
    console.log("聊天页面加载");
    toUser.toUserId = option?.toUser
    toUser.toUserName = option?.toUserName
    toUser.toUserPicture = option?.toUserPicture
    linkId.value = option?.linkId
    unread.value = option?.unread
    uni.setNavigationBarTitle({
        title: option?.toUserName
    })
})
onUnload(() => {
    console.log("页面卸载");
    // 将聊天内容缓存到本地
    if(messageList.length > 0){
        uni.setStorageSync(`chat${toUser.toUserId}`, messageList)
    }
    socket.value?.close()
    socket.value?.onClose(() => {
        clearInterval(heartInterval)
        console.log("关闭连接");

    })
})
const sendMessage = () => {
    socket.value?.send({
        data: JSON.stringify(
            {
                linkId: linkId.value,
                content: inputValue.value,
                toUser: toUser.toUserId,
                fromUser: userInfo.value.id
            }
        )
    })
    messageList.push({
        scrollId: messageList.length,
        content: inputValue.value,
        toUser: toUser.toUserId,
        fromUser: String(userInfo.value.id),
        linkId: linkId.value,
        sendTime: useDateFormat(useNow(), "YYYY-MM-DD HH:mm").value
    })
    inputValue.value = ""
    nextTick(() => {
        scrollIntoView.value = 'msg' + (messageList.length - 1)
    })
    scrollIntoView.value = ''

}

onMounted(async () => {
    console.log("挂载");
    if (socket.value == null) {
        initWebsocket()
    }
    // 读取缓存的聊天内容
    console.log(unread.value);
    let chatHistory = uni.getStorageSync(`chat${toUser.toUserId}`)
    console.log("chatHistory",chatHistory=='');
    
    if (chatHistory) {
        messageList.length = 0
        messageList.push(...uni.getStorageSync(`chat${toUser.toUserId}`))
    }
    if (unread.value > 0) {
        await clearUnRead(String(userInfo.value.id), linkId.value)
        // 获取最新的消息
        const result = await pageChatMessage(1, unread.value, linkId.value)
        messageList.push(...result.data.records)
        
    }
    if(chatHistory == ""){
        const result = await allMessages(linkId.value)
        console.log(result);
        
        messageList.push(...result.data)
    }
    nextTick(()=>{
        scrollIntoView.value = "modal"
    })
    scrollIntoView.value = ''
})

</script>
<template>
    <view class="chat-view-container">
        <scroll-view scroll-y="true" style="height:calc(100vh - 44px - 55px);" :scroll-into-view="scrollIntoView"
            :enable-flex="true" class="chat-view-list">
            <template v-for="item in messageList" :key="item.content" >

                <view v-if="item.fromUser != String(userInfo.id)" :id="'msg' + item.scrollId" class="chat-other-message">
                    <view class="message-avatar">
                        <image :src="toUser.toUserPicture" style="height: 100%;width: 100%;" mode="scaleToFill" />
                    </view>
                    <view class="other-message-content">
                        <text>{{ item.content }}</text>
                    </view>
                </view>
                <view v-else class="chat-mine-message" :id="'msg' + item.scrollId">
                    <view class="mine-message-content">
                        <text>{{ item.content }}</text>
                    </view>
                    <view class="message-avatar">
                        <image :src="userInfo.avatar" style="height: 100%;width: 100%;" mode="scaleToFill" />
                    </view>
                </view>
            </template>
            <view id="modal"></view>
        </scroll-view>
        <view class="chat-input-container" style="display: flex;flex-direction: column;">
            <view style="display: flex;width: 100%;">
                <uni-easyinput v-model="inputValue" :focus="isFocus" maxlength="-1" type="textarea" confrimType="send"
                    @confirm="" style="height:35px;" :styles="{ backgroundColor: 'rgba(143, 147, 156, 0.2);' }"
                    :inputBorder="false" class="chat-input" />
                <button class="chat-send-btn" :disabled="isSend" @tap.stop="sendMessage">发送</button>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.message-content-common {
    min-height: 20px;
    max-width: 75vw;
    padding: 5px;
    font-size: $xh-font-size-lg;
    position: relative;
    border-radius: 5px;
}

.chat-view-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    background-color: white;

    .navigator-header {
        height: 44px;
        background-color: white;
        display: flex;
    }

    .chat-view-list {
        display: flex;
        flex-direction: column;
        padding: 20px 0 15px 0;
        box-sizing: border-box;
        // height: calc(100vh - 44px - 55px);

        .chat-mine-message {
            display: flex;
            margin-bottom: 10px;
            justify-content: flex-end;

            .mine-message-content {
                @extend .message-content-common;
                background-color: $xh-color-primary;
                margin-right: 6px;
            }

            .message-avatar {}

            .mine-message-content::after {
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                top: 40px;
                bottom: 0;
                right: -4px;
                transform: translateY(-25px);
                border-left: 5px solid $xh-color-primary;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
            }


        }

        .message-avatar {
            $avatar-side: 40px;
            width: $avatar-side;
            height: $avatar-side;
        }

        #modal {}

        .chat-other-message {
            display: flex;
            margin-bottom: 10px;

            .message-avatar {}


            .other-message-content {
                @extend .message-content-common;
                background-color: rgba($color: $xh-color-info, $alpha: .2);
                margin-left: 6px;
            }

            .other-message-content::before {
                content: " ";
                width: 0;
                height: 0;
                position: absolute;
                top: 40px;
                bottom: 0;
                transform: translateY(-20px);
                left: -4px;
                border-right: 5px solid rgba($color: $xh-color-info, $alpha: .2);
                border-bottom: 5px solid transparent;
                border-top: 5px solid transparent;
            }
        }

    }

    .chat-input-container {
        display: flex;
        align-items: center;
        padding: 10px 5px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;

        .chat-input-icon {
            width: 25px;
            height: 25px;
            padding: 5px;
        }

        .chat-input {
            background-color: rgba($color: $xh-color-info, $alpha: .2);
            border: none;
            border-radius: 15px;
            overflow: hidden;
        }

        .chat-send-btn {
            height: 25px;
            background-color: $xh-color-primary;
            line-height: 25px;
            font-size: $xh-font-size-base;
            // padding: 5px;

        }

        .emoji-list-container {
            display: flex;
            background-color: rgba($color: $xh-color-info, $alpha: .2);
            height: 35vh;
            flex-wrap: wrap;
            margin-top: 5px;
            padding-top: 5px;
            column-gap: 5px;

            text {
                font-size: $xh-font-size-2xl;
                padding: 5px;
            }
        }


    }
}
</style>
