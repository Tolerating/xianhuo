<script lang="ts" setup>
import { ref } from 'vue';
import { reactive } from 'vue';
const secondaryCategory = reactive<SecondCategory[]>([
    
        {
            id: 1,
            title: "平板电脑",
            child: [
                { id: 11, name: "平板Ipad", img: "logo.png" },
                { id: 12, name: "小米平板", img: "logo.png" },
                { id: 13, name: "华为平板", img: "logo.png" },
                { id: 14, name: "ipad Air4", img: "logo.png" },
                { id: 15, name: "华为Mate Pro", img: "logo.png" },
                { id: 16, name: "Ipad mini6", img: "logo.png" },
                { id: 17, name: "ipad Pro 2代", img: "logo.png" },
                { id: 18, name: "ipad 2020", img: "logo.png" },
            ]
        },
        {
            id: 2,
            title: "摄影摄像",
            child: [
                { id: 21, name: "单反相机", img: "logo.png" },
                { id: 22, name: "微单相机", img: "logo.png" },
                { id: 23, name: "数码相机", img: "logo.png" },
                { id: 24, name: "胶卷相机", img: "logo.png" },
                { id: 25, name: "单反镜头", img: "logo.png" },
                { id: 26, name: "镜头", img: "logo.png" },
                { id: 27, name: "一次性相机", img: "logo.png" },
                { id: 28, name: "手机镜头", img: "logo.png" },
            ]
        },
        {
            id: 3,
            title: "电脑外设",
            child: [
                { id: 31, name: "键盘", img: "logo.png" },
                { id: 32, name: "鼠标", img: "logo.png" },
                { id: 33, name: "移动硬盘", img: "logo.png" },
                { id: 34, name: "U盘", img: "logo.png" },
                { id: 35, name: "摄像头", img: "logo.png" },
            ]
        },
        {
            id: 4,
            title: "智能设备",
            child: [
                { id: 41, name: "智能手表", img: "logo.png" },
                { id: 42, name: "无人机", img: "logo.png" },
                { id: 43, name: "智能手环", img: "logo.png" },
                { id: 44, name: "智能音箱", img: "logo.png" },
            ]
        }
    
])
const topCategory = reactive<{ id: number, name: string,child:SecondCategory[] }[]>([
    { id: 1, name: "数码",child:secondaryCategory },
    { id: 2, name: "技能服务",child:secondaryCategory },
    { id: 3, name: "生活",child:secondaryCategory },
    { id: 4, name: "服饰鞋帽",child:secondaryCategory },
    { id: 5, name: "美容装彩",child:secondaryCategory },
    { id: 6, name: "优惠券码",child:secondaryCategory },
    { id: 7, name: "运动户外",child:secondaryCategory },
    { id: 8, name: "家用电器",child:secondaryCategory },
    { id: 9, name: "模玩动漫",child:secondaryCategory },
    { id: 10, name: "宠物花卉",child:secondaryCategory },
    { id: 11, name: "包表首饰",child:secondaryCategory },
    { id: 12, name: "游戏装备",child:secondaryCategory },
    { id: 13, name: "图书音像",child:secondaryCategory },
    { id: 14, name: "汽摩生活",child:secondaryCategory },
    { id: 15, name: "手机",child:secondaryCategory },
    { id: 16, name: "租房",child:secondaryCategory },
    { id: 17, name: "租房",child:secondaryCategory },
    { id: 18, name: "租房",child:secondaryCategory },
    { id: 19, name: "租房",child:secondaryCategory }
])
interface SecondCategory {
    id: number,
    title: string,
    child: { id: number, name: string, img: string }[]
}
/*
[
    [{id:1,name:"平板电脑",child:[{id:11,name:"平板iPad",img:"1.png"}}]]
]
*/
const currentTab = ref<number>(0)
const switchTab = ()=>{

}

</script>
<template>
    <view class="goods-type-container">
        <view class="goods-type-left"> 
            <scroll-view scroll-y="true" class="left-scroll">
                <view class="left-scroll-item" :style="currentTab==index?'background-color: rgba(241, 110, 132,.4);':''" v-for="(item,index) in topCategory" :key="item.id" @tap="currentTab=index">{{ item.name }}</view>
            </scroll-view>

        </view>
        <view class="goods-type-right">
            <scroll-view scroll-y="true" class="right-scroll">
                <view class="right-card" v-for="(item,index) in topCategory[currentTab].child" :key="index">
                    <text class="right-card-title">{{ item.title }}</text>
                    <view class="right-card-content">
                        <view class="category-unit" v-for="item1 in item.child" :key="item1.id">
                            <view class="sub-view ">
                                <image :src="'../../static/'+ item1.img" mode="scaleToFill" />
                            </view>
                            <view>
                                <text class="description-1" style="font-size: 18px;text-align: center;">{{ item1.name }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                
            </scroll-view>
        </view>
    </view>
</template>
<style scoped lang="scss">
.goods-type-container {
    background-color: red;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
}

.goods-type-left {
    height: 100vh;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: white;
    border-right: 1px solid gray;

    .left-scroll {
        height: 100%;
        color: rgb(175, 172, 172);
        font-size: 20px;
        text-align: center;

        .left-scroll-item {
            height: 50px;
            line-height: 50px;
            
        }
    }
}

.goods-type-right {
    flex: 1;
    background-color: white;
    display: flex;
    height: 100vh;
    flex-direction: column;

    .right-scroll {
        height: 100%;
    }

    .right-card {
        $padding-left:10px;
        width: 100%;

        .right-card-title {
            font-size: 24px;
            color: black;
            padding-left: $padding-left;
        }

        .right-card-content {
            display: flex;
            flex-wrap: wrap;

            .category-unit {
                $img-width: 100%;
                flex: 0 0 33%;
                max-width: 33%;
                box-sizing: border-box;
                padding:  $padding-left;
                .sub-view  {
                    padding-bottom: 100%;
                    position: relative;

                    image {
                        width: $img-width;
                        height: $img-width;
                        position: absolute;
                        left: 0;
                        right: 0;
                    }

                }
               
            }
        }
    }
}</style>
