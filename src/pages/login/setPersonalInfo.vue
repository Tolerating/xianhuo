<script lang="ts" setup>
import { uploadImg } from '@/api/home/goods';
import StatusBar from '@/components/StatusBar.vue'
import type { User } from '@/types/Users';
import type { FileSelect } from '@/types/common';
import { onReady } from '@dcloudio/uni-app';
import { reactive } from 'vue';
import { ref } from 'vue';
const formData = reactive<{
    name: string,
    avatar: string,
    school: string,
    location: string
}>({
    name: "",
    avatar: "",
    school: "",
    location: ""
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
        "url": "http://localhost/img/avatar.png",
    }
])
const avatar = ref<string>("")
const setAvatar = async (e: FileSelect) => {
    console.log(e);
    const result = await uploadImg({ name: "file", file: e.tempFiles[0].file, uri: e.tempFilePaths[0] })
    avatar.value = result.data

}
const birthday = ref<string>("1998-05-12")
const formRules = {
    name: {
        rules: [{
            required: true,
            errorMessage: '姓名不能为空'
        }, {
            validateFunction(rule: Object, value: any, data: Object, callback: Function) {
                const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,16}$/
                console.log(reg.test(value));
                if (!reg.test(value)) {
                    callback("昵称仅支持字母、数字、下划线")
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
const submit = () => {
    form.value.validate().then((res: any) => {
        console.log(res);
    }).catch((res: any) => {
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
                    <uni-easyinput v-model.trim="formData.school" type="text" placeholder="选择您的学校" @confirm="" />
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
