<template>
  <div class="resourceContainer">
    <div class="catalogueContainer">
      <div class="resourceHeader">catalogue</div>
      <el-divider />
      <div class="resourceTitleBox">
        <ul style="list-style-type: none; padding: 0; margin: 0">
          <li
            v-for="items in resourcesList"
            :key="items.id"
            class="resourceTitleBoxLi"
            @click="changeResource(items.titles, items.content)"
            :class="{select:items.titles==selectTitles}"
          >
          <div class="resourceTitle">
            {{ items.titles }}
          </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="resourceArcticsContainer">
      <resourceArcticContainer
        :title="resourceTitle"
        :content="resourceContent"
      />
    </div>
  </div>
</template>
<script setup class="resources">
import resourceArcticContainer from "./components/resourceArcticContainer.vue";
import { ref, onMounted } from "vue";
import { getResourcesListApi } from "@/api/resources/index.js";
const resourcesList = ref([]);
const resourceTitle = ref();
const resourceContent = ref();
const selectTitles = ref()

// 获取全部recources函数
const getResourcesList = async () => {
  const res = await getResourcesListApi();
  resourcesList.value = res.rows;
};

// 更改渲染在主页的文章
function changeResource(title, content) {
  resourceTitle.value = title;
  resourceContent.value = content;
  selectTitles.value=title;
  console.log("点击后此时select：",selectTitles.value,typeof selectTitles,",此时title",title,typeof title,"比较结果",selectTitles.value===title)
}
onMounted(() => {
  getResourcesList().then(() => {
    // 将title里面的标签全部拿掉
    for (let i of resourcesList.value) {
      i.titles = i.titles.replace(/<[^>]+>/g, "");
    }
    resourceTitle.value = resourcesList.value[0].titles;
    resourceContent.value = resourcesList.value[0].content;
  });
});
</script>

<style scoped lang="less" src="./assets/index.css"></style>
