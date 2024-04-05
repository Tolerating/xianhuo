export interface Notice {
    id: string
    /**
     * 通知标题
     *
     * @type {string}
     * @memberof Notice
     */
    title: string
    /**
     * 通知内容
     *
     * @type {string}
     * @memberof Notice
     */
    content: string
    /**
     * 接受者id
     *
     * @type {string}
     * @memberof Notice
     */
    receiverId: string
    /**
     * 类型，0表示帖子，1表示商品
     *
     * @type {number}
     * @memberof Notice
     */
    attachType:number,
    /**
     * 商品id或帖子id
     *
     * @type {string}
     * @memberof Notice
     */
    attach:string,
    /**
     * 发布人id
     *
     * @type {string}
     * @memberof Notice
     */
    publisher:string,
    /**
     * 创建时间
     *
     * @type {string}
     * @memberof Notice
     */
    createTime: string
}