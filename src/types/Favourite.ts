export interface Favourite{
    /**
     * 收藏表id
     *
     * @type {string}
     * @memberof Favourite
     */
    id?:string,
    /**
     * 用户id
     *
     * @type {string}
     * @memberof Favourite
     */
    userId:string,
    /**
     * 商品id
     *
     * @type {string}
     * @memberof Favourite
     */
    productId:string,
    /**
     * 创建时间
     *
     * @type {string}
     * @memberof Favourite
     */
    createTime?:string,
    /**
     * 删除时间
     *
     * @type {string}
     * @memberof Favourite
     */
    deleteTime?:string
}