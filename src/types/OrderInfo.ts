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
     * 售后id
     *
     * @type {string}
     */
    afterServiceId?:string,
    /**
     * 能否平台介入标志【商家拒绝过一次即置为1】，0表示不能，1表示行
     *
     * @type {(0|1)}
     */
    platformFlag?:0|1;
    /**
     *  商家售后处理状态，0为等待商家处理，1为商家同意，2表示商家不同意
     *
     * @type {(-1|0|1)}
     */
    sellerAfterStatus?:-1|0|2,
   /**
    * 平台售后处理状态，-1表示平台未介入，0表示平台介入，1表示处理完成
    *
    * @type {(0|-1|1)}
    */
   platformAfterStatus?:0|-1|1,
     /**
      *  售后表状态，0表示售后处理中，-1表示售后失败，1表示售后成功，11表示待发货，12表示待收货
      *
      * @type {(0|-1|1)}
      */
     afterStatus?:0|-1|1|11|12,

     /**
      * 售后创建时间
      *
      * @type {string}
      */
     afterCreateTime?:string,
    /**
     * 商品描述
     *
     * @type {string}
     */
    productDetail:string,
    /**
     * 商品图片
     *
     * @type {string}
     */
    productImages:string,
    /**
     * 商品地址
     *
     * @type {string}
     */
    productAddress:string,
    /**
     * 商品分类
     *
     * @type {string}
     */
    productCategory:string,
    /**
     * 购买者id
     *
     * @type {string}
     */
    buyId: string,
    /**
     * 出售者id
     *
     * @type {string}
     */
    sellId:string,
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
     * 支付金额
     *
     * @type {string}
     */
    total?:string,
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
     *商品状态，1表示已支付且待确认收货，0表示已退款,-1表示未支付（默认），2表示售后处理中
     *
     * @type {string}
     */
    status?: -1 | 1 | 0 | 2,
    /**
     *购买者收货状态，1表示确认收货，0表示未确认
     *
     * @type {(1|0)}
     */
    buyerStatus?:1|0,
    /**
     *出售者发货状态，1表示已发货，0表示未发货
     *
     * @type {(1|0)}
     */
    sellerStatus?:1|0,
    /**
     * 买家收货时间
     *
     * @type {string}
     */
    buyerReceiveTime?:string,
    /**
     * 卖家发货时间
     *
     * @type {string}
     */
    sellerSendTime?:string,
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