<template>
  <div class="workerBox">
    <div class="workerHeaderBox" @click="dialogVisible = true">
      <el-avatar :size="60" :src="avatarUrl" />
    </div>
    <div class="workerDetailBox">
      <div class="workeName" @click="toPersonalDetail(personalInfo.profile)">
        {{ personalInfo.name }}
      </div>
      <div class="workerDirection">{{ personalInfo.way }}</div>
      <div v-if="showTooltip" class="tooltip">
        {{ personalInfo.way }}
      </div>
      <div id="tooltip-portal"></div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="personalInfo.name "
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
import { defineProps, ref, computed } from "vue";
import useUserStore from "@/store/modules/user.js";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

const router = useRouter();
const personalInfo = defineProps({
  name: String,
  avater: String,
  way: String,
  id: String,
  kind: String,
});
const showTooltip = ref(false);
const showLargeImage = ref(false); // 控制大图显示状态

const userStore = useUserStore();
const baseUrl = computed(() => userStore.baseUrl);
const avatarUrl = computed(() => `${baseUrl.value}${personalInfo.avater}`);

const showLargeImageFn = () => {
  showLargeImage.value = true;
  console.log("展示头像大图");
  console.log(showLargeImage.value);
};

const dialogVisible = ref(false);

const handleClose = () => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function toPersonalDetail() {
  router.push({
    path: "/index/userDetail",
    query: { userId: personalInfo.id, userKind: personalInfo.kind },
  });
}
</script>

<style lang="less">
.large-image {
  width: 100%;
  height: auto;
}

.large-image {
  width: 100%; /* 宽度100% */
  height: auto; /* 高度自动 */
  max-height: 400px; /* 可根据需要设置最大高度 */
  object-fit: cover; /* 确保图像保持比例并覆盖整个区域 */
}

</style>
