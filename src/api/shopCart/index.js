import request from '../../plugin/request.js'
// 获取购物车中所有的商品
const getAllCartGoods = ()=>request("/shopCartGoods",null,"GET");
// 删除商品
const deleteCartGoods = (data)=>request("/deleteCartGoods",data,"POST");
export {getAllCartGoods,deleteCartGoods}