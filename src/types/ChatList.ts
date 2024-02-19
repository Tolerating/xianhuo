export interface ChatList {
  //聊天列表主键
  listId: string,
  //聊天关系表
  linkId: string,
  //发送
  fromUser: string,
  //接收
  toUser: string,
  //    接收者头像
  toUserPicture: string,
  // 接受者昵称
  toUserName: string,
  //    发送者头像
  fromUserPicture: string,
  // 发送者昵称
  fromUserName: string,
  //发送方是否在窗
  fromWindow: number,
  //接收方是否在窗
  toWindow: number,
  //未读
  unread: number,
  //是否删
  status: number,
  content?: string,
  sendTime?: string
}