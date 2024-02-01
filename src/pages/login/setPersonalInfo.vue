<script lang="ts" setup>
import { uploadImg } from '@/api/home/goods';
import StatusBar from '@/components/StatusBar.vue'
import type { User } from '@/types/Users';
import type { AMAPLocation, FileSelect } from '@/types/common';
import { onHide, onReady, onShow } from '@dcloudio/uni-app';
import { reactive } from 'vue';
import { ref } from 'vue';
import {DEFAULT_AVATAR,APP_BASE_URL} from '@/config/index'
import { improveInfo } from '@/api/user/user'
const formData = reactive<{
    name: string,
    avatar: string,
    school: string,
    location: string
}>({
    name: "",
    avatar: APP_BASE_URL + DEFAULT_AVATAR,
    school: "",
    location: ""
})
// 存储地址选择界面传回的地址信息
const selectedLocation = reactive<AMAPLocation>({} as AMAPLocation)
onShow(()=>{
    console.log("设置用户信息---显示");
    
    uni.$once("school-location", (data) => {
        Object.assign(selectedLocation, data)
        // 处理发布商品定位，格式为 "经度,维度"
        const { name,location:{longitude,latitude} } = data
        formData.school = name.replace(/\\/g,"")
        formData.location = `${longitude},${latitude}`
    })
})
const imageStyles = reactive({
    width: 150,
    height: 150,
    border: {
        radius: '50%'
    }
})
const avatarPreview = reactive([
    {
        "name": "avatar.png",
        "extname": "png",
        "url": APP_BASE_URL + DEFAULT_AVATAR,
    }
])
const setAvatar = async (e: FileSelect) => {
    const result = await uploadImg({ name: "file", file: e.tempFiles[0].file, uri: e.tempFilePaths[0] })
    console.log(result);
    formData.avatar = result.data

}
// 表单验证规则
const formRules = {
    name: {
        rules: [{
            required: true,
            errorMessage: '姓名不能为空'
        }, {
            validateFunction(rule: Object, value: string, data: Object, callback: Function) {
                const reg = /^[\u4e00-\u9fa5\w]{1,16}$/g
                console.log(value);
                if (!reg.test(value)) {
                    callback("昵称仅支持汉字，字母、数字、下划线，长度不超过16个字符")
                }
                return true

            }
        }]
    },
    school: {
        rules: [{
            required: true,
            errorMessage: '学校不能为空'
        }]
    }
}
// 表单元素的引用
const form = ref()
// 提交更新信息
const submit = () => {
    // 表单校验
    form.value.validate().then(async (res: any) => {
        // 校验成功
        console.log(formData);
        const result = await improveInfo(formData)
        console.log("更新结果",result);
        
    }).catch((res: any) => {
        // 校验失败
        console.log(res);

    })
}
</script>
<template>
    <view class="personal-container">
        <StatusBar></StatusBar>
        <uni-forms ref="form" :model="formData" :rules="formRules">
            <uni-section type="line" class="property-item" title="设置昵称">
                <uni-forms-item required name="name">
                    <uni-easyinput v-model="formData.name" type="text" placeholder="设置您的昵称" />
                </uni-forms-item>
            </uni-section>
            <uni-section type="line" class="property-item" title="设置头像">
                <view style="display: flex; justify-content: center;">
                    <uni-file-picker limit="1" style="flex: none;width: auto;" mode="grid" :del-icon="false" disable-preview
                        v-model="avatarPreview" :imageStyles="imageStyles" :auto-upload="false" file-mediatype="image"
                        @select="setAvatar">选择</uni-file-picker>
                </view>
            </uni-section>
            <uni-section type="line" class="property-item" title="选择学校">
                <uni-forms-item required name="school">
                    <navigator url="/pages/home/release/locationSelect" open-type="navigate" hover-class="navigator-hover">
                    <uni-easyinput
                        v-model="formData.school"
                        prefixIcon="location-filled"
                        type="text"
                        placeholder="选择你的学校"
                        :disabled="true"
                        :clearable="false"
                    />
                </navigator>
                </uni-forms-item>
            </uni-section>
            <button @click="submit" class="submit-btn">提交</button>
        </uni-forms>




    </view>
</template>
<style lang="scss" scoped>
.personal-container {
    padding: 0 $xianhuo-padding-LR;
    background-color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .property-item {
        padding: 20px 0;
    }
    .submit-btn{
        background-color: $xh-color-primary;
        color:$xh-text-color-main;
    }
}
</style>
