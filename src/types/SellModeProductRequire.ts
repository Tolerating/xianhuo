export interface SellModeProductRequire{
     id:number;
    
     /**
      *售卖模式id
      *
      * @type {number}
      * @memberof SellModeProductRequire
      */
     sellModeId:number;
     /**
      *售卖模式名字
      *
      * @type {string}
      * @memberof SellModeProductRequire
      */
     sellName:string;

     /**
      *发货方式id
      *
      * @type {number}
      * @memberof SellModeProductRequire
      */
     dispatchId:number;
     /**
      *发货方式名字
      *
      * @type {string}
      * @memberof SellModeProductRequire
      */
     dispatchName:string;

     /**
      *商品要求id
      *
      * @type {number}
      * @memberof SellModeProductRequire
      */
     productRequireId:number;
     /**
      *商品要求名字
      *
      * @type {string}
      * @memberof SellModeProductRequire
      */
     productRequireName:string;
    
     /**
      *状态，1有效，0无效
      *
      * @type {number}
      * @memberof SellModeProductRequire
      */
     status:number;
    
     /**
      *创建时间
      *
      * @type {string}
      * @memberof SellModeProductRequire
      */
     createTime:string;
    
     /**
      *更新时间
      *
      * @type {string}
      * @memberof SellModeProductRequire
      */
     updateTime:string;
}