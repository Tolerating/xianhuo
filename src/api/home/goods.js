import request from '../../plugin/request.js'
// 下拉瀑布流获取商品
const getIndexGoodsList = ()=>request("/v1/goods/indexGoodsList",null,"GET");

// 获取全部目录
const getAllCategory = ()=>request(`/v1/catalog/getAll`,null,"GET");

// 获取商品一级分类
const getFirstCategory = ()=>request(`/v1/catalog/getFirst`,null,"GET");

// 获取商品二级分类
const getSecondCategory = (firstId)=>request(`/v1/catalog/getSecond?parent=${firstId}`,null,"GET");

// 获取商品三级分类
const getThirdCategory = (secondId)=>request(`/v1/catalog/getThird?parent=${secondId}`,null,"GET");

export {getIndexGoodsList,getFirstCategory,getSecondCategory,getThirdCategory,getAllCategory}