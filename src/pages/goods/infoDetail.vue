<!-- 商品详情页 -->
<template>
    <view class="goods-detail-container">
        <!--	发布者信息	-->
        <view class="publish-info">
            <view>
                <image :src="partUserInfo.avatar"></image>
                <view class="info-right">
                    <text style="font-size:15px"><b>{{ partUserInfo.name }}</b></text>
                    <text style="align-self: center">{{ partUserInfo.school }}</text>
                </view>
            </view>
            <view>
                <view class="store-button" @tap="naviagteToStoreHouse">进入TA的仓库</view>
            </view>
        </view>
        <!--  商品描述  -->
        <uni-section type="line" padding="0 0 0 20px" class="sell-item" title="商品描述">
            <text class="goods-description">
                {{ info.detail }}
            </text>
        </uni-section>
        <uni-section type="line" padding="0 0 0 20px" class="sell-item" title="商品类别">
            <template v-slot:right>
                {{ categoryName }}
            </template>
        </uni-section>
        <uni-section type="line" padding="0 0 0 20px" class="sell-item" title="学校名称">
            <text style="color: rgb(15, 105, 241);text-decoration: underline solid rgb(15, 105, 241);">
                {{ partUserInfo.school }}</text>
        </uni-section>
        <view class="selled-container">
			<image v-if="info.status == '-1'" src="../../static/product_off.png" mode="scaleToFill" />
		</view>
        <!--  页脚操作栏  -->
        <view class="goods-detail-footer" v-if="info.status == '1'">
            <uni-goods-nav :options="[{
                    icon: 'compose',
                    text: '投诉'
                }]" :button-group="[
                    {
                        text: '联系TA',
                        backgroundColor: '#fd8464',
                        color: '#fff'
                    }
                ]" :fill="true" @click="complainPost" @button-click="footerBtn" />

        </view>
    </view>
</template>

<script lang="ts" setup>
import { getInfoById } from '@/api/home/require'
import { ref } from "vue";
import { reactive } from 'vue';
import useProductStore from '@/stores/product';
import { queryLink } from '@/api/chat/index'
import useUserStore from '@/stores/users';
import { onLoad } from '@dcloudio/uni-app';
import { usePartUserInfo } from '@/hooks/user/usePartUserInfo'
import { complainProduct } from '@/api/home/goods'
import { onMounted } from 'vue';
import type { RequireInfo } from '@/types/RequireInfo';
import type { Complain } from '@/types/Complain';
const productStore = useProductStore()
const userStore = useUserStore()
// 商品图片列表
const imgList = reactive<string[]>([])
const info = reactive<RequireInfo>({} as RequireInfo)

// 商品分类名字
const categoryName = ref<string>("")
// 获取商品发布者部分信息
const { partUserInfo, requestPartUserInfo } = usePartUserInfo()

const pageParams = reactive<{ pId: string, uId: string }>({
    pId: "",
    uId: ""
})
// 页脚按钮
const footerBtn = async (e: any) => {
    if (e.content.text == "联系TA") {
        if (info.userId != String(userStore.userInfo.id)) {
            // 1.查询是否有聊天关系,没有服务端会直接创建
            let result = await queryLink(String(info.userId), String(userStore.userInfo.id))
            let { linkId } = result.data
            uni.navigateTo({
                url: `/pages/home/chat/chatView?toUser=${info.userId}&toUserName=${partUserInfo.name}&toUserPicture=${partUserInfo.avatar}&linkId=${linkId}&unread=0`,
            })
        }
    }

}
const complainPost = () => {
    if (userStore.userInfo.id != Number(info.userId)) {
        uni.showModal({
            title: "投诉帖子",
            editable: true,
            placeholderText: "违规原因",
            success(res) {
                if (res.confirm) {
                    console.log(res.content);
                    let data: Complain = {
                        complainantCause: res.content || "帖子违规",
                        complainantId: String(userStore.userInfo.id),
                        complainantSubject: String(info.id),
                        sellerId: String(partUserInfo.id),
                        type: 0
                    }
                    complainProduct(data).then(res => {
                        uni.showToast({
                            title: res.message,
                            icon: "success"
                        })
                    })
                }
            }
        })
    }
}
// 页面初始化
const init = async (pId: string) => {
    const result = await getInfoById(pId)
    Object.assign(info, result.data)
    categoryName.value = productStore.categoryNameById(info.categoryId) || ""
}
const naviagteToStoreHouse = () => {
    let data = encodeURIComponent(JSON.stringify(partUserInfo))
	uni.navigateTo({
		url: `/pages/home/mine/myStoresHouse?userInfo=${data}&self=0`
	})
}
onLoad((options) => {
    pageParams.pId = options?.pId
    pageParams.uId = options?.uId
    requestPartUserInfo(options?.uId)

})
onMounted(() => {
    init(pageParams.pId)

})
</script>

<style lang="scss" scoped>
$footer-height: 50px;
.selled-container {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 100px;
	top: 100px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.goods-detail-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5px $xianhuo-padding-LR $footer-height;
}

.publish-info {
    $info-height: 50px;
    display: flex;
    height: $info-height;
    align-items: center;
    justify-content: space-between;

    view:nth-child(1) {
        display: flex;
        align-items: center;
    }

    image {
        height: $info-height - 10px;
        width: $info-height - 10px;
        border-radius: 50%;
    }

    .info-right {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: $info-height;
        align-items: center;
        font-size: 12px;
    }

    .store-button {
        background-color: $xh-color-primary;
        padding: 5px;
        border-radius: 15px;

    }
}

.goods-info {
    $info-height: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .base-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: $info-height;
        width: 100%;

        .base-info-left {
            float: left;
            color: red;
            font-size: 24px;
            font-weight: bold;
        }

        .base-info-right {
            float: right;
            display: flex;
            flex-direction: column;
            font-size: 13px;

            text:nth-child(1) {
                background-color: $xianhuo-theme-main;
            }
        }
    }

}

.goods-type {
    display: flex;
    height: 50px;
    flex-direction: column;

    .type-title {
        font-size: 15px;
        font-weight: bold;
    }

}


.goods-image {
    display: flex;
    //width: 100%;
    background-color: #2f2f2f;
    justify-content: space-around;
    flex-wrap: wrap;

    image {
        width: 100%;
    }
}

.goods-detail-footer {
    position: fixed;
    z-index: 1000;
    // inset: 93% 0 0 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: $footer-height;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0 $xianhuo-padding-LR;
    font-size: 11px;

    .footer-icon {
        display: flex;
        flex-direction: column;
    }

    .footer-button {
        display: flex;
        align-items: center;
        padding: 3px;
        font-size: 16px;
        border-radius: 15px;
        background-color: $xianhuo-theme-color;

        text:nth-last-child(1) {
            font-weight: bold;
        }
    }

}
</style>