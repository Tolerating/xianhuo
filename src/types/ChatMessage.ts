export interface ChatMessage {
  /**
   * 用于窗口滚动定位的id
   *
   * @type {number}
   * @memberof ChatMessage
   */
  scrollId?: number,
  /**
   *聊天内容表主键
   *
   * @type {string}
   * @memberof ChatMessage
   */
  messageId?:string,
  /**
   聊天关系表主键
   *
   *
   * @type {string}
   * @memberof ChatMessage
   */
  linkId: string,
  /**
   *发送内容
   *
   * @type {string}
   * @memberof ChatMessage
   */
  content: string,
  /**
    接收方id
   *
   *
   * @type {string}
   * @memberof ChatMessage
   */
  toUser: string
  /**
   *发送方id
   *
   * @type {string}
   * @memberof ChatMessage
   */
  fromUser: string,
  /**
   *发送时间
   *
   * @type {string}
   * @memberof ChatMessage
   */
  sendTime: string,
  /**
   * 消息类型，1表示文本，2表示图片
   *
   * @type {number}
   * @memberof ChatMessage
   */
  type?:number,
  /**
   * 消息显示类型，chat表示聊天消息，notice表示系统通知
   *
   * @type {("chat" | "notice")}
   * @memberof ChatMessage
   */
  showTypes?: "chat" | "notice",
  /**
   *是否为最后一条消息，1表示是，0表示不是
   *
   * @type {number}
   * @memberof ChatMessage
   */
  idLatest?:number
}