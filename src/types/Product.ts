export type Product = {
    // 商品id
    id:number | null,
    // 商品分类id
    categoryId:number,
    // 商品详情
    detail:string,
    // 商品图片
    images:string,
    // 商品现价，保留两位小数
    currentPrice:string,
    // 物品出租时间计量单位
    timeUnit?:"时"|"天"|"周"|"月"|"年"| "学期",
    // 商品原价
    originPrice:string,
    // 出售方式id
    sellModeId:number,
    // 发货方式id
    dispatchModeId:number,
    // 发布者id
    userId:number,
    // 商品要求id,以逗号分隔
    productRequireId:string,
    // 商品状态，1表示在售，0表示售出，-1表示下架
    status:number,
    // 商品所在学校定位
    location:string,
    // 运费
    freight?:string,
    // 创建时间
    createTime?:string,
    // 更新时间
    updateTime?:string,
    // 删除时间
    deleteTime?:string,
    [key: string]: unknown
}

export const timeUnit = ["时","天","周","月","年", "学期"]