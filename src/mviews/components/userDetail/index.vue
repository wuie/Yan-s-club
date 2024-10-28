<template>
  <div class="detailContainer">
    <div class="userName">{{ computedUsername }}</div>
    <div class="userHeader">
    <div class="ql-editor"  v-html="personIntroduce"></div>
      <div class="userAvater">
        <img :src="avatarUrl" height="100vw" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getUserDetailApi } from "@/api/userDetail/userDetail.js";
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user.js";

import { QuillEditor } from "@vueup/vue-quill";
// import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import "@vueup/vue-quill/dist/vue-quill.snow.css";


// 拼接头像
const userStore = useUserStore(); // 正确调用store
const baseUrl = computed(() => userStore.baseUrl);
//首先在setup中定义
const route = useRoute();
//query
// let userProfile=route.query.userProfile;
let username = "";
const userAvater = ref("");
let userId = route.query.userId;
let userKind = route.query.userKind;

let personIntroduce = "";
// console.log('avateru',userAvater)
// console.log(username)

const personData = ref(null);
const computedUsername = computed(() => personData.value?.name || "未知用户名");
const getUserDetail = async () => {
  const res = await getUserDetailApi(userKind, userId);
  personData.value = res.data;
  username = personData.value.name || "未知用户名";
  personIntroduce = personData.value.profile || "暂无信息";
  userAvater.value = personData.value.picture || "暂无头像";
};

const avatarUrl = computed(() => {
  return `${baseUrl.value}${userAvater.value}`;
});

onMounted(() => {
  getUserDetail();
  console.log("个人信息：", personIntroduce);
  // console.log('个人id：',userId,',个人类型',userKind)
  // console.log('头像：',avatarUrl)
  // console.log('userAvater：',userAvater)
});
// ？调用接口查询个人信息
// staff可以用id查，hzau和yzw都是
// /public-information/staff/1
// master,postDocs一起用id查
// /public-information/master/1
// phdStudents和underGraduate用id查
// /public-information/students/1

const editorOption = {
        theme: 'snow', // 主题
        placeholder: '',
        modules: {
          toolbar: {
            container: [
            ], // 自定义工具栏选项
          },
        }
      }

</script>

<style scoped lang="less">
.detailContainer {
  width: 90%;
  padding-left: 5%;
}

.userName {
  display: flex;
  justify-content: center;
  font-size: 5vh;
  font-weight: bold;
  padding: 3vh;
}

.userHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between
}

.userIntroduce {
  font-size: 2vh !important;
}

.ql-toolbar.ql-snow{
  border:rgb(255, 255, 255) !important
}
</style>
