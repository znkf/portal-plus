<template>
    <div class="new-detail">
        <div
            class="question-list-item"
            v-for="(f,index) in detail"
            :key="index"
            @click="handleNewAnswers(f.replyContent)"
          >{{index+1}}. {{f.faqTitle}}</div>
        <!-- <a class="question-list-item" @click="handleNewAnswers">{{detail.faqContent}}</a> -->
        <!-- <div v-if="sss">{{detail.replyContent}}</div> -->
    </div>
</template>
<script>
export default {
    props: {
        detail: {
            type: Array,
            default: () => {}
        }
    },
    data() {
        return {
        }
    },
    methods:{
        handleNewAnswers(replyContent){
            console.log("选择的答案",replyContent)
            this.$emit("handleNewAnswer", replyContent);
        }
    }
}
</script>