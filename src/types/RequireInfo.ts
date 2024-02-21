export interface RequireInfo{
     /**
      * 需求id
      *
      * @type {string}
      * @memberof RequireInfo
      */
     id?:string;
     /**
      * 分类id
      *
      * @type {number}
      * @memberof RequireInfo
      */
     categoryId:number;
    
     /**
      * 需求信息
      *
      * @type {string}
      * @memberof RequireInfo
      */
     detail:string;
    
     /**
      * 发布者id
      *
      * @type {string}
      * @memberof RequireInfo
      */
     userId:string;
     /**
      * 需求状态，1表示需求未解决，-1表示下架
      *
      * @type {string}
      * @memberof RequireInfo
      */
     status:string;
    
     /**
      * 需求所在学校定位
      *
      * @type {string}
      * @memberof RequireInfo
      */
     location:string;
    
     /**
      * 学校名字
      *
      * @type {string}
      * @memberof RequireInfo
      */
     school:string;
    
     /**
      * 创建时间
      *
      * @type {string}
      * @memberof RequireInfo
      */
     createTime?:string;
}