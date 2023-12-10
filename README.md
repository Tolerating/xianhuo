# 说明
1. 首页`[pages/home/index]`面存在瀑布流，使用nvue原生渲染提高性能
[nvue页面与vue开发的常见区别](https://uniapp.dcloud.net.cn/tutorial/nvue-outline.html#_1-%E6%96%B0%E5%BB%BA-nvue-%E9%A1%B5%E9%9D%A2)
nvue页面开发注意事项：
* 控制显隐只可以使用v-if不可以使用v-show
* 只能使用flex布局

# 问题
## 主页搜索框多次点击问题
多次点击搜索框后，搜索页会跳转多次，需要在第一次点击时做一个判断（如果flag为true则不执行，路由跳转成功后再把flag设置为false）