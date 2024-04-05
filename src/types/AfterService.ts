export interface AfterService {
     id?:string,
     /**
      *买家id
      *
      * @type {string}
      * @memberof AfterService
      */
     buyerId:string,
     /**
      *退货原因
      *
      * @type {string}
      * @memberof AfterService
      */
     cause:string,
     /**
      * 商品描述
      *
      * @type {string}
      * @memberof AfterService
      */
     productDetail:string,

     /**
      * 商品价格
      *
      * @type {string}
      * @memberof AfterService
      */
     productPrice:string,
     /**
      *图片,逗号分隔
      *
      * @type {string}
      * @memberof AfterService
      */
     images:string,
     /**
      *商品id
      *
      * @type {string}
      * @memberof AfterService
      */
     productId:string,
     /**
      *订单表商家订单id
      *
      * @type {string}
      * @memberof AfterService
      */
     orderId:string,
     /**
      *卖家id
      *
      * @type {string}
      * @memberof AfterService
      */
     sellerId:string,
     /**
      *商家处理状态，0为等待商家处理【默认】，1为商家同意，2表示商家不同意，
      *
      * @type {0|1|2}
      * @memberof AfterService
      */
     sellerStatus?:0|1|2,
     /**
      *商家处理时间
      *
      * @type {string}
      * @memberof AfterService
      */
     sellerDealTime?:string,
     /**
      * 商家拒绝原因
      *
      * @type {string}
      * @memberof AfterService
      */
     sellerRefuseCause?:string,
     /**
      *平台处理状态，-1表示平台未介入【默认】，0表示平台介入，1表示处理完成
      *
      * @type {-1|0|1}
      * @memberof AfterService
      */
     platformStatus?:-1|0|1,
     /**
      * 平台处理结果
      *
      * @type {string}
      * @memberof AfterService
      */
     platformResult?:string,
     /**
      * 平台处理人id
      *
      * @type {string}
      * @memberof AfterService
      */
     platformUser?:string,
     /**
      *平台处理时间
      *
      * @type {string}
      * @memberof AfterService
      */
     platformDealTime?:string,
     /**
      * 售后表状态，0表示售后处理中，-1表示售后失败，1表示售后成功，11表示待发货，12表示待收货
      *
      * @type {string}
      * @memberof AfterService
      */
     status?: 0|1|-1|11|12,
	 /**
       *买家发货状态，0表示未发货，1表示已发货
       *
       * @type {(0|1)}
       * @memberof AfterService
       */
      buyerSend?:0|1,
	 /**
       *买家发货时间
       *
       * @type {string}
       * @memberof AfterService
       */
      buyerSendTime?:string,
	 /**
       *卖家收货状态，0表示未收货，1表示已收货
       *
       * @type {(0|1)}
       * @memberof AfterService
       */
      sellerReceive?:0|1,
	 /**
       *卖家收货时间
       *
       * @type {string}
       * @memberof AfterService
       */
      sellerReceiveTime?:string,
     /**
      * 创建时间
      *
      *
      * @type {string}
      * @memberof AfterService
      */
     createTime?:string,
}