export type OrderInfo = {
    /**
     * 订单表主键
     *
     * @type {string}
     */
    id?: string,
    /**
     * 商家订单id
     *
     * @type {string}
     */
    orderId: string,
    /**
     * 购买者id
     *
     * @type {string}
     */
    buyId: string,
    /**
     * 支付宝订单编号
     *
     * @type {string}
     */
    alipayId?: string,
    /**
     *商品id
     *
     * @type {string}
     */
    productId: string,
    /**
     * 支付类型，1表示支付宝，2表示微信
     *
     * @type {string}
     */
    type?: 1 | 2,
    /**
     *支付平台购买用户id
     *
     * @type {string}
     */
    buyerSysId?: string
    //    
    /**
     * 支付平台购买用户账号
     *
     * @type {string}
     */
    buyerSysAccount?: string,
    /**
     *商品状态，1表示已支付且待确认收货，0表示已收货,-1表示未支付（默认）
     *
     * @type {string}
     */
    status?: -1 | 1 | 0,
    /**
     * 订单创建时间
     *
     * @type {string}
     */
    createTime?: string,
    /**
     * 订单支付时间
     *
     * @type {string}
     */
    payTime?: string

}