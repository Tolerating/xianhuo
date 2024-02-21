import {request} from '@/plugin/request'
import type {ChatList} from '@/types/ChatList'
import type{ChatMessage} from "@/types/ChatMessage"
import type { ChatUserLink } from '@/types/ChatUserLink'

/**
 *获取当前用户的聊天列表
 *
 */
const chatLists = ()=>request<ChatList>("/chatlists",{},"GET")

/**
 *分页获取聊天内容
 *
 * @param {number} current
 * @param {number} size
 * @param {string} linkId
 */
const pageChatMessage = (current:number,size:number,linkId:string)=>request(`/chatMessage?current=${current}&size=${size}&linkId=${linkId}`,{},"GET")

/**
 * 获取全部聊天内容
 *
 * @param {string} linkId
 */
const allMessages = (linkId:string)=>request<ChatMessage[]>(`/chatMessage/${linkId}`,{},"GET")

/**
 * 清除未读消息
 *
 * @param {string} fromUser
 * @param {string} linkId
 */
const clearUnRead = (fromUser:string,linkId:string)=>request<string>(`/chatlist/status?fromUser=${fromUser}&linkId=${linkId}`,{},"GET")

/**
 * 查询聊天关系
 *
 * @param {string} toUser
 * @param {string} fromUser
 */
const queryLink = (toUser:string,fromUser:string)=>request<ChatUserLink>(`/chatListLink?toUser=${toUser}&fromUser=${fromUser}`,{},"GET")

/**
 * 删除聊天列表，更新status字段为1
 *
 * @param {string} listId
 */
const deleteList = (listId:string)=>request(`/chatlist/${listId}`,{},"DELETE")
export {
    chatLists,
    pageChatMessage,
    clearUnRead,
    queryLink,
    deleteList,
    allMessages
}