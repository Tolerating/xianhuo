<script lang="ts" setup>
import WaterFullLayoutVue from '@/components/WaterFullLayout.vue';
import { ref } from 'vue';
const emoji = ["😂", "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "😕", "😟", "🙁", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐"]
const inputValue = ref<string>("")
const isShowEmoji = ref<boolean>(false);
const inputDOM = ref<HTMLInputElement | null>(null)
const emojiOperation = ()=>{
    isShowEmoji.value = !isShowEmoji.value
}
</script>
<template>
    <WaterFullLayoutVue>
        <view class="chat-view-container" @tap="isShowEmoji = false">
            <view class="chat-mine-message" v-for="item in 20" :key="item">
                <view class="mine-message-content">
                    <text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</text>
                </view>
                <view class="message-avatar">
                    <image src="../../../static/logo.png" style="height: 100%;width: 100%;" mode="scaleToFill" />
                </view>
            </view>
            <view class="chat-other-message">
                <view class="message-avatar">
                    <image src="../../../static/logo.png" style="height: 100%;width: 100%;" mode="scaleToFill" />
                </view>
                <view class="other-message-content">
                    <text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ex exercitationem inventore
                        repudiandae laboriosam totam similique explicabo esse quasi nobis. Vitae dolor ex voluptas!
                        Doloribus corporis libero assumenda, soluta aperiam omnis cupiditate quaerat cumque. Aliquam tempora
                        magnam, labore expedita recusandae nobis autem eos quisquam doloribus ad excepturi deserunt sed.
                        Qui.</text>
                </view>
            </view>
        </view>
        <template #footer>
            <view class="chat-input-container">
                <uni-icons type="mic-filled" color="black" size="25" class="chat-input-icon" />
                <uni-easyinput v-model="inputValue" type="text" ref="inputDOM" confrimType="send" :inputBorder="false"
                    placeholder="想和TA说点什么..." @confirm="" :styles="{ backgroundColor: 'rgba(143, 147, 156, 0.2)' }"
                    class="chat-input" />
                <image :src="isShowEmoji ? '../../../static/icon/keyboard.png' : '../../../static/icon/biaoqing.png'"
                    mode="scaleToFill" class="chat-input-icon" @tap="emojiOperation" />
                <image src="../../../static/icon/add.png" mode="scaleToFill" class="chat-input-icon" />
            </view>
            <scroll-view :enable-flex="true" :scroll-y="true" class="emoji-list-container" v-show="isShowEmoji">
                <text v-for="item in emoji" :key="item" @tap="inputValue = inputValue + item">
                    {{ item }}
                </text>
            </scroll-view>
        </template>
    </WaterFullLayoutVue>
</template>
<style lang="scss" scoped>
.message-content-common {

    min-height: 20px;
    max-width: 75vw;
    padding: 5px;
    font-size: $xh-font-size-lg;
    position: relative;
    border-radius: 5px;
}

.chat-view-container {
    display: flex;
    flex-direction: column;
    padding: 20px 0 15px 0;

    .chat-mine-message {
        align-self: flex-end;
        display: flex;
        margin-bottom: 15px;

        .mine-message-content {
            @extend .message-content-common;
            background-color: $xh-color-primary;
            margin-right: 6px;
        }

        .mine-message-content::after {
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            top: 40px;
            bottom: 0;
            right: -4px;
            transform: translateY(-25px);
            border-left: 5px solid $xh-color-primary;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }


    }

    .message-avatar {
        $avatar-side: 40px;
        width: $avatar-side;
        height: $avatar-side;
    }

    .chat-other-message {
        align-self: flex-start;
        display: flex;


        .other-message-content {
            @extend .message-content-common;
            background-color: rgba($color: $xh-color-info, $alpha: .2);
            margin-left: 6px;
        }

        .other-message-content::before {
            content: " ";
            width: 0;
            height: 0;
            position: absolute;
            top: 40px;
            bottom: 0;
            transform: translateY(-20px);
            left: -4px;
            border-right: 5px solid rgba($color: $xh-color-info, $alpha: .2);
            border-bottom: 5px solid transparent;
            border-top: 5px solid transparent;
        }
    }

}

.emoji-list-container {
    display: flex;
    background-color: rgba($color: $xh-color-info, $alpha: .2);
    height: 35vh;
    flex-wrap: wrap;
    column-gap: 5px;

    text {
        font-size: $xh-font-size-2xl;
        padding: 5px;
    }
}

.chat-input-container {
    display: flex;
    align-items: center;
    padding: 10px 5px;
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // height: 50px;

    .chat-input-icon {
        width: 25px;
        height: 25px;
        padding: 5px;
    }

    .chat-input {
        background-color: rgba($color: $xh-color-info, $alpha: .2);
        border: none;
        border-radius: 15px;
        overflow: hidden;
    }


}
</style>
