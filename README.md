# 说明
1. 首页`[pages/home/index]`面存在瀑布流，使用nvue原生渲染提高性能
[nvue页面与vue开发的常见区别](https://uniapp.dcloud.net.cn/tutorial/nvue-outline.html#_1-%E6%96%B0%E5%BB%BA-nvue-%E9%A1%B5%E9%9D%A2)
nvue页面开发注意事项：
* 控制显隐只可以使用v-if不可以使用v-show
* 只能使用flex布局

# 问题
## 主页搜索框多次点击问题
多次点击搜索框后，搜索页会跳转多次，需要在第一次点击时做一个判断（如果flag为true则不执行，路由跳转成功后再把flag设置为false）

## 安卓APP获取包名
```js
var main = plus.android.runtimeMainActivity();
var pkName = main.getPackageName();
console.log(pkName)
```


## 调用第三方软件导航
```js
//H5用法
// 设置目标位置坐标点和其实位置坐标点
var dst = new plus.maps.Point(116.39131928,39.90793074); // 天安门 
var src = new plus.maps.Point(116.335,39.966); // 大钟寺
// 调用系统地图显示 
plus.maps.openSysMap( dst, "天安门", src );

//uni用法，APP端默认高德地图，需要在manifest中配置keys
uni.getLocation({
    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
    success: function (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        //打开第三方导航软件
        uni.openLocation({
            latitude: latitude,
            longitude: longitude,
            success: function () {
                console.log('success');
            }
        });
    }
});
```

组件库：
* uni-ui
* [金额输入键盘](https://ext.dcloud.net.cn/plugin?id=8201)