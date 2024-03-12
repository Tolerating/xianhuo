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
				<!-- <text>信用：100</text> -->
				<view class="store-button" @tap="naviagteToStoreHouse">进入TA的仓库</view>
			</view>
		</view>
		<!--  商品信息  -->
		<view class="goods-info">
			<!--   价格、售卖模式   -->
			<view class="base-info">
				<view class="base-info-left">
					<ProductPrice :mode="product.sellModeId" :origin-price="product.originPrice"
						:current-price="product.currentPrice" :time-unit="product.timeUnit"></ProductPrice>
				</view>
				<view class="base-info-right">
					<!--   售卖模式      -->
					<SellModeIcon :mode="product.sellModeId"></SellModeIcon>
				</view>
			</view>
		</view>
		<!--  商品描述  -->
		<uni-section type="line" padding="0 0 0 20px" class="sell-item" title="商品描述">
			<text class="goods-description">
				{{ product.detail }}
			</text>
		</uni-section>
		<uni-section type="line" padding="0 0 0 20px" class="sell-item" title="商品类别">
			<template v-slot:right>
				{{ categoryName }}
			</template>
		</uni-section>
		<uni-section type="line" padding="0 0 0 20px" class="sell-item" title="发货方式">
			<template v-slot:right>
				<text style="color: red;">
					{{ dispatchNameComputed }}
				</text>
			</template>

		</uni-section>
		<uni-section v-if="product.productRequireId" type="line" padding="0 0 0 20px" class="sell-item" title="商品要求">
			<uni-tag v-for="item in productRequireNameList" :key="item" :text="item" size="normal" type="warning"
				style="margin-right: 5px;color: black;" />
		</uni-section>
		<uni-section type="square" class="sell-item" title="商品图片">
			<view class="goods-image" @tap="previewImg">
				<image v-for="item in imgList" :key="item" :src="item" mode="widthFix"></image>
			</view>
		</uni-section>
		<view class="selled-container">
			<image v-if="product.status == 0" src="../../static/product_selled.png" mode="scaleToFill" />
			<image v-if="product.status == -1" src="../../static/product_off.png" mode="scaleToFill" />
		</view>
		<!--  页脚操作栏  -->
		<view class="goods-detail-footer">
			<uni-goods-nav v-if="product.status == 1" :options="goodsNavOption" :button-group="[
					{
						text: '咨询卖家',
						backgroundColor: '#fd8464',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#bf3916',
						color: '#fff'
					}
				]" :fill="true" @click="starProduct" @button-click="footerBtn" />

		</view>
	</view>
</template>

<script lang="ts" setup>
import SellModeIcon from '@/components/goods/SellModeIcon.vue'
import { requestProductById, addFavourite, queryFavourite, cancelFavourite,complainProduct } from '@/api/home/goods'
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { ref } from "vue";
import { reactive } from 'vue';
import type { Product } from '@/types/Product';
import useProductStore from '@/stores/product';
import useCommonStore from '@/stores/common'
import { queryLink } from '@/api/chat/index'
import useUserStore from '@/stores/users';
import { onLoad } from '@dcloudio/uni-app';
import { APP_BASE_URL } from '@/config/index'
import { usePartUserInfo } from '@/hooks/user/usePartUserInfo'
import { computed } from 'vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import type { Complain } from '@/types/Complain';

// 商品图片列表
const imgList = reactive<string[]>([])
const product = reactive<Product>({
	id: null,
	categoryId: -1,
	detail: "",
	images: "",
	currentPrice: "",
	timeUnit: "时",
	originPrice: "",
	sellModeId: -1,
	dispatchModeId: -1,
	userId: -1,
	productRequireId: "",
	status: 1,
	location: "",
	address: ""
})
const dispatchNameComputed = computed(() => {
	if (dispatchName.value == "快递") {
		return product.freight == "null" ? dispatchName.value + "(包邮)" : dispatchName.value + "(￥" + product.freight + ")"
	} else {
		return dispatchName.value
	}
})
const productStore = useProductStore()
const commonStore = useCommonStore()
const userStore = useUserStore()
// 商品分类名字
const categoryName = ref<string>("")
// 商品发货方式名字
const dispatchName = ref<string>("")
// 商品要求列表
const productRequireNameList: string[] = []
const pageParams = reactive<{ pId: string, uId: string }>({
	pId: "",
	uId: ""
})
// 获取商品发布者部分信息
const { partUserInfo, requestPartUserInfo } = usePartUserInfo()
const { homeRefesh } = storeToRefs(commonStore)
const goodsNavOption = reactive([
	{
		icon: 'compose',
		text: '投诉'
	},
	{
		icon: 'star',
		text: '收藏'
	}
])
//预览图片
const previewImg = () => {
	uni.previewImage({
		urls: imgList
	})
}
const initFooterOptions = (flag: boolean) => {
	if (flag) {
		goodsNavOption.length = 0
		goodsNavOption.push({ icon: 'compose', text: '投诉' }, { icon: "star-filled", text: "收藏" })
	} else {
		goodsNavOption.length = 0
		goodsNavOption.push({ icon: 'compose', text: '投诉' }, { icon: "star", text: "收藏" })
	}
}
// 添加收藏
const starProduct = async (e: any) => {

	if (userStore.userInfo.id != product.userId) {
		const { text } = e.content
		if (text == "收藏") {
			switch (goodsNavOption[1].icon) {
				case "star":
					// 添加收藏
					let result = await addFavourite({ userId: String(userStore.userInfo.id), productId: String(product.id) })
					uni.showToast({
						title: result.message
					})
					initFooterOptions(true)
					userStore.counts.star++
					break;
				case "star-filled":
					// 取消收藏
					let result1 = await cancelFavourite(String(userStore.userInfo.id), String(product.id))
					uni.showToast({
						title: result1.message
					})
					initFooterOptions(false)
					userStore.counts.star--
					break;
			}
		}else{
			uni.showModal({
				title: "投诉商品",
				editable:true,
				placeholderText:"违规原因",
				success(res){
					if(res.confirm){
						console.log(res.content);
						let data:Complain = {
							complainantCause:res.content || "商品违规",
							complainantId:String(userStore.userInfo.id),
							complainantSubject:String(product.id),
							sellerId:String(partUserInfo.id),
							type:1						
						}
						complainProduct(data).then(res=>{
							uni.showToast({
								title: res.message,
								icon:"success"
							})
						})
					}
				}
			})
		}



	}
}

// 页脚按钮
const footerBtn = async (e: any) => {
	console.log(e);
	if (e.content.text == "咨询卖家") {
		if (product.userId != userStore.userInfo.id) {
			// 1.查询是否有聊天关系,没有服务端会直接创建
			let result = await queryLink(String(product.userId), String(userStore.userInfo.id))
			let { linkId } = result.data
			uni.navigateTo({
				url: `/pages/home/chat/chatView?toUser=${product.userId}&toUserName=${partUserInfo.name}&toUserPicture=${partUserInfo.avatar}&linkId=${linkId}&unread=0`,
			})
		}
	} else {
		if (product.userId != userStore.userInfo.id) {
			let data = encodeURIComponent(JSON.stringify(product))
			uni.navigateTo({
				url: `/pages/goods/goodsPay?product=${data}`
			})
		}
	}

}
// 页面初始化
const init = async (pId: string) => {
	const result = await requestProductById(Number(pId))
	// console.log(result);
	Object.assign(product, result.data)
	// console.log(productStore.categoryList);
	categoryName.value = productStore.categoryNameById(product.categoryId) || ""
	// console.log(categoryName.value);
	imgList.length = 0
	imgList.push(...product.images.split(",").map(value => APP_BASE_URL + value));
	dispatchName.value = productStore.dispatchModeNameById(product.dispatchModeId) || ""
	productRequireNameList.push(...productStore.productRequireNameById(product.productRequireId.split(",")))
	// 查询商品是否被收藏了
	let isFav = await queryFavourite(String(userStore.userInfo.id), String(product.id))
	initFooterOptions(isFav.data == 1)
	// 判断商品是否已经下架或出售，返回时更新瀑布流
	if (product.status != 1) {
		homeRefesh.value = !homeRefesh.value
	}

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
	// init(options?.pId)
	requestPartUserInfo(options?.uId)
	console.log(options);

})
onMounted(async () => {
	init(pageParams.pId)

})
</script>

<style lang="scss" scoped>
$footer-height: 50px;

.goods-detail-container {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 5px $xianhuo-padding-LR $footer-height;
}

.selled-container {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 100px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
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