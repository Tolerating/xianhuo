export interface ChatUserLink {
    /**
     * 主键
     *
     * @type {string}
     * @memberof ChatUserLink
     */
    linkId?:string,
    /**
     * 发送者id
     *
     * @type {string}
     * @memberof ChatUserLink
     */
    fromUser:string,
    /**
     * 接收者id
     *
     * @type {string}
     * @memberof ChatUserLink
     */
    toUser:string,
    /**
     * 创建时间
     *
     * @type {string}
     * @memberof ChatUserLink
     */
    createTime?:string
}