<template>
  <div class="workerBox">
    <div class="workerHeaderBox">
      <div class="pentagon-avatar" @click="dialogVisible = true">
        <img :src="avatarUrl" />
      </div>
    </div>
    <div class="workerDetailBox">
      <div class="workeName" @click="toPersonalDetail(personalInfo.profile)">
        {{ personalInfo.name }}
      </div>
      <div class="workerDirection">{{ personalInfo.way }}</div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="personalInfo.name"
      width="500"
      :before-close="handleClose"
    >
      <img :src="avatarUrl" alt="大图" class="large-image" />
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import useUserStore from "@/store/modules/user.js";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

const router = useRouter();
const personalInfo = defineProps({
  name: String,
  avater: String,
  id: String,
  kind: String,
  way: String,
});

const dialogVisible = ref(false);
// 拼接头像
const userStore = useUserStore(); // 正确调用store
const baseUrl = computed(() => userStore.baseUrl);
const avatarUrl = computed(() => {
  return `${baseUrl.value}${personalInfo.avater}`;
});
onMounted(() => {
  console.log("源地址：", baseUrl);
  console.log("头像地址：", avatarUrl);
});

// 跳转个人信息详情
function toPersonalDetail() {
  router.push({
    path: "/index/userDetail",
    query: {
      userId: personalInfo.id,
      userKind: personalInfo.kind,
    },
  });
}
</script>

<style lang="less">
.workerBox {
  padding: 0.5vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 2px;
  margin-top: 1vh;
  transition: background-color 0.2s ease 0.1s;
}

.workerBox:hover {
  background-color: rgb(235, 235, 235);
}
.workerDetailBox {
  display: flex;
  flex-direction: column;
  /* font-family: PingFangSC-medium; */

  color: rgb(145, 145, 145);
}
.workeName:hover {
  color: orange;
}
.workeName {
  color: rgb(38, 38, 38);
  font-size: 1vw;
  font-weight: 600;
  margin-bottom: 1vh;
  font-family: PingFangSC-Large;
  transition: color 0.2s ease 0.1s;
}
.workerDirection {
  font-size: 1vw;
  white-space: nowrap; /* 阻止文本换行 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.pentagon-avatar {
  position: relative;
  width: 60px;
  height: 60px;
  clip-path: polygon(50% 0%, 95% 35%, 79% 90%, 21% 90%, 5% 35%);
  overflow: hidden;
  border-radius: 10px;
}

.pentagon-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.large-image {
  width: 100%; /* 宽度100% */
  height: auto; /* 高度自动 */
  max-height: 400px; /* 可根据需要设置最大高度 */
  object-fit: cover; /* 确保图像保持比例并覆盖整个区域 */
}
</style>
