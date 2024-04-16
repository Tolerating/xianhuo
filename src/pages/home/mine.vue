<template>
    <view class="mine_page_wrapper">
        <view class="status_bar" :style="{ height: statusBarHeight + 'px' }">

        </view>
        <view class="mine_top_profile">
            <view class="profile_top">
                <image :src="userInfo.avatar" mode="aspectFill"></image>
                <view class="profile_top_right">
                    <text style="font-size: 20px;">{{ userInfo.name }}</text>
                    <text style="font-size: 12px;">{{userInfo.email}}</text>
                </view>
            </view>
            <view class="profile_bottom">
                <view class="bottom_operation" @tap="countsNavigate(1)">
                    <text style="font-size: 20px;">{{ counts.star }}</text>
                    <text style="font-size: 12px;">我的收藏</text>
                </view>
                <view class="bottom_operation" @tap="countsNavigate(2)">
                    <text style="font-size: 20px;">{{ counts.released }}</text>
                    <text style="font-size: 12px;">我的闲置</text>
                </view>
                <view class="bottom_operation" @tap="countsNavigate(3)">
                    <text style="font-size: 20px;">{{ counts.released }}</text>
                    <text style="font-size: 12px;">我的仓库</text>
                </view>
                <view class="bottom_operation" @tap="countsNavigate(4)">
                    <text style="font-size: 20px;">{{ counts.article }}</text>
                    <text style="font-size: 12px;">我的需求</text>
                </view>
            </view>
        </view>
        <view class="mine_deal_wrapper">
            <view class="mine_deal_card">
                <view class="deal_card_title">
                    <text>我的交易</text>
                </view>
                <view class="deal_card_body">
                    <view class='deal_option' @tap="orderNavigate(1)">
                        <view class="icon_group">
                            <view class="cu-tag badge" style="right: 0px;">{{ orderCount.dispatch }}</view>
                        </view>
                        <text style="font-size: 13px;color: #999898;">待发货</text>
                    </view>
                    <view class='deal_option'  @tap="orderNavigate(2)">
                        <view class="icon_group">
                            <view class="cu-tag badge" style="right: 0px;">{{ orderCount.receive }}</view>
                        </view>
                        <text style="font-size: 13px;color: #999898;">待收货</text>
                    </view>
                    <view class='deal_option' @tap="orderNavigate(3)"> 
                        <view class="icon_group">
                            <view class="cu-tag badge" style="right: 0px;">{{ orderCount.sell }}</view>
                        </view>
                        <text style="font-size: 13px;color: #999898;">出售记录</text>
                    </view>
                    <view class='deal_option' @tap="orderNavigate(4)">
                        <view class="icon_group">
                            <view class="cu-tag badge" style="right: 0px;">{{ orderCount.buy }}</view>
                        </view>
                        <text style="font-size: 13px;color: #999898;">购买记录</text>
                    </view>
                    <view class='deal_option' @tap="orderNavigate(5)">
                        <view class="icon_group">
                            <view class="cu-tag badge" style="right: 0px;">{{ orderCount.after }}</view>
                        </view>
                        <text style="font-size: 13px;color: #999898;">售后</text>
                    </view>
                </view>
            </view>
        </view>
        <uni-list>
            <uni-list-item title="我的收益" :rightText="'￥ '+ orderCount.profit" />
            <uni-list-item title="卖家待处理售后" clickable @click="toDealAfterService" :rightText="orderCount.waitDeal" />
            <uni-list-item showArrow title="修改个人信息" clickable @click="navigateToUpdate"/>
            <uni-list-item showArrow title="退出登录" clickable @click="logoutXH" />
            <!-- <uni-list-item showArrow title="用户服务协议" /> -->
        </uni-list>
    </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import useUserStore from '@/stores/users/index'
import useCommonStore from "@/stores/common"
import {onShow} from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import {orderTypeCount} from '@/api/home/goods'
const statusBarHeight = ref<number>(Number(uni.getSystemInfoSync().statusBarHeight));
const userStore = useUserStore()
const commonStore = useCommonStore()
const {closeSocket} = commonStore
const orderCount = reactive<{
    dispatch: string,
    receive: string,
    buy: string,
    sell: string,
    profit:string,
    after:string,
	waitDeal:string
}>({
    dispatch: "",
    receive: "",
    buy: "",
    sell: "",
    after:"",
    profit:"0.0",
	waitDeal:""
})
const { userInfo, counts } = storeToRefs(userStore)
const {resetUserInfo} = userStore
// 我的收藏，我的帖子，我的发布页面跳转函数
const countsNavigate = (flag: number) => {
    switch (flag) {
        case 1:
            // 我的收藏
            uni.navigateTo({
                url: "/pages/home/mine/favouriteList"
            })
            break;
        case 2:
            // 我的发布
            uni.navigateTo({
                url: "/pages/home/mine/releasedProductList"
            })
            break;
        case 3:
            // 我的仓库
            uni.navigateTo({
                url: `/pages/home/mine/myStoresHouse?id=$userInfo=${userInfo.value.id}&self=1`
            })
            break;
        case 4:
            // 我的帖子
            uni.navigateTo({
                url: "/pages/home/mine/requireList"
            })
            break;
        default:
            break;
    }
}

// 我的收藏，我的帖子，我的发布页面跳转函数
const orderNavigate = (flag: number) => {
    switch (flag) {
        case 1:
            // 待发货
            uni.navigateTo({
                url: "/pages/home/mine/dispatchProduct"
            })
            break;
        case 2:
            // 待收货
            uni.navigateTo({
                url: "/pages/home/mine/receiveProduct"
            })
            break;
        case 3:
            // 出售记录
            uni.navigateTo({
                url: `/pages/home/mine/saleRecord`
            })
            break;
        case 4:
            // 购买记录
            uni.navigateTo({
                url: "/pages/home/mine/buyRecord"
            })
            break;
        case 5:
            // 售后
            uni.navigateTo({
                url: "/pages/home/mine/afterService"
            })
            break;
        default:
            break;
    }
}

const toDealAfterService = ()=>{
    uni.navigateTo({
        url: "/pages/home/mine/waitDealAfterService"
    })
}

const navigateToUpdate = ()=>{
	uni.navigateTo({
		url:"/pages/login/setPersonalInfo?flag=1"
	})
}

const logoutXH = () => {
    uni.showModal({
        title: '提示',
        content: '确定退出',
        success: function (res) {
            if (res.confirm) {
				resetUserInfo()
				closeSocket()
                // uni.removeStorageSync("xh_user")
                console.log("退出前",uni.getStorageSync("xh_user"),userInfo.value);
                
                uni.redirectTo({
                    url: "/pages/login/index"
                })
            } else if (res.cancel) {
            }
        }
    });

}
onShow(()=>{
    orderTypeCount().then(res=>{
        Object.assign(orderCount,res.data)
    })
	userStore.initCounts()
})
</script>

<style lang="scss" scoped>
.mine_page_wrapper {
    height: 100%;
    background-color: #F0F0F0;

    .status_bar {
        position: sticky;
        top: 0;
        background-color: #5290FF;
    }
}


.mine_top_profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #5290FF;
    padding: 5px 5px 0;
    padding-bottom: 35px;
    color: white;
    transform: translateY(-1px);

    .profile_top {
        display: flex;
        max-height: 80px;
        padding: 0 10px 10px 10px;
        align-items: center;

        image {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: 1px solid white;
        }

        .profile_top_right {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
        }
    }

    .profile_bottom {
        display: flex;
        justify-content: space-around;

        .bottom_operation {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
        }
    }
}

.mine_deal_wrapper {
    display: flex;
    justify-content: center;

    .mine_deal_card {
        width: 85%;
        height: 126px;
        border-radius: 15px;
        background-color: white;
        transform: translateY(-25px);
        box-shadow: 6px 6px 7px #a69f9f;
        display: flex;
        flex-direction: column;

        .deal_card_title {
            flex: 1;
            font-size: 16px;
            padding-left: 15px;
            padding-top: 16px;
            font-weight: bold;
        }

        .deal_card_body {
            flex: 2;
            display: flex;
            justify-content: space-around;
            padding: 10px;

            .deal_option {
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;

                .icon_group {
                    position: relative;
                    text-align: center;
                }
            }
        }
    }

}
</style>
