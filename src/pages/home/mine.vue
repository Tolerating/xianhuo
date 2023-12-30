<template>
    <view class="mine_page_wrapper">
        <view class="status_bar" :style="{height: statusBarHeight+'px'}">

        </view>
        <view class="mine_top_profile">
            <view class="profile_top">
                <image src="../../static/goods.png" mode="aspectFill"></image>
                <view class="profile_top_right">
                    <text style="font-size: 20px;">我的昵称</text>
                    <text>关注 0 | 粉丝 0</text>
                </view>
            </view>
            <view class="profile_bottom">
                <view class="bottom_operation">
                    <text style="font-size: 20px;">0</text>
                    <text style="font-size: 12px;">收藏</text>
                </view>
                <view class="bottom_operation">
                    <text style="font-size: 20px;">0</text>
                    <text style="font-size: 12px;">店铺</text>
                </view>
                <view class="bottom_operation">
                    <text style="font-size: 20px;">0</text>
                    <text style="font-size: 12px;">暂定</text>
                </view>
                <view class="bottom_operation">
                    <text style="font-size: 20px;">0</text>
                    <text style="font-size: 12px;">暂定</text>
                </view>
            </view>
        </view>
        <view class="mine_deal_wrapper">
            <view class="mine_deal_card">
                <view class="deal_card_title">
                    <text>我的交易</text>
                </view>
                <view class="deal_card_body">
                    <view class='deal_option' v-for="(item, index) in dealItem" :key="index">
                        <view class="icon_group">
                            <text :class="'cuIcon-' + item.icon" style="font-size: 30px;"></text>
                            <view class="cu-tag badge" style="right: 0px;">9</view>
                        </view>
                        <text style="font-size: 13px;color: #999898;">{{ item.name }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ref } from 'vue';
const statusBarHeight = ref<number>(Number(uni.getSystemInfoSync().statusBarHeight));
const dealItem = reactive([
    {
        name: "待付款",
        icon: 'pay'
    },
    {
        name: "待发货",
        icon: 'send'
    },
    {
        name: "待收货",
        icon: 'deliver'
    },
    {
        name: "退款/售后",
        icon: 'refund'
    }
])
</script>

<style lang="scss" scoped>
.mine_page_wrapper {
    height: 100%;
    background-color: #F0F0F0;
    .status_bar{
        position: sticky;
        top: 0;
    }
}

.goods_details_navBar_container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 15px;
    font-size: 18px;
    background-color: blue;
    color: white !important;
    // flex-direction: column;
    min-height: 45px;
}

.mine_top_profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #5290FF;
    padding: 0 5px;
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
