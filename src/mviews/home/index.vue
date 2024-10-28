<template>
  <div class="container">
    <div class="interestBox">
      <div class="titleBox">We are interested in</div>
      <el-divider/>

      <ul>
        <li v-for="items in InterestList" :key="items.id">
          <interestBox :title="items.title" :content="items.content" />
        </li>
      </ul>
    </div>
    <div class="bulletinBox">
      <div class="titleBox">Bulletin</div>
      <el-divider />

      <ul>
        <li v-for="items in BulletinList" :key="items.id">
          <bulletinBox
            :title="items.title"
            :date="items.date"
            :link="items.link"
            :id="items.id"
          />
        </li>
      </ul>
    </div>
    <div class="linkstBox">
      <div class="titleBox">Links</div>
      <el-divider />
      <ul>
        <li v-for="items in LinksList" :key="index" class="linksDetailBox">
          <p @click="goTarget(items.link)">{{ items.title }}</p>
        </li>
      </ul>
      <el-divider />
    </div>
  </div>

</template>

<script setup class="home">
import { ref, onMounted } from "vue";
import { getInterestListApi } from "@/api/Home/interest.js";
import { getBulletinListApi } from "@/api/Home/bulletin.js";
import { getLinksListApi } from "@/api/Home/links.js";
import interestBox from "./components/interestBox.vue";
import bulletinBox from "./components/bulletinBox.vue";

const InterestList = ref([]);
const BulletinList = ref([]);
const LinksList = ref([]);
// 获取全部interest
const getInterestList = async () => {
  const res = await getInterestListApi();
  InterestList.value = res.rows;
};

// 获取全部bulletin
const getBulletinList = async () => {
  const res = await getBulletinListApi();
  BulletinList.value = res.rows;
};

// 获取全部links
const getLinksList = async () => {
  const res = await getLinksListApi();
  LinksList.value = res.rows;
};

onMounted(() => {
  getBulletinList().then(() => {
    for (let i of BulletinList.value) {
      if (i.title != null&&i.content!=null&&i.link!=null) {
        i.title = i.title.replace(/<[^>]+>/g, "");
        i.content = i.content.replace(/<[^>]+>/g, "");
        i.link = i.link.replace(/<[^>]+>/g, "");
      }
     
    }
  });
  getInterestList().then(() => {
    for (let i of InterestList.value) {
      i.title = i.title.replace(/<[^>]+>/g, "");
      i.content = i.content.replace(/<[^>]+>/g, "");
    }
  });
  getLinksList().then(() => {
    for (let i of LinksList.value) {
      // 将标题中的p标签替换掉
      i.title = i.title.replace(/<[^>]+>/g, "");

      let htmlString = i.link;
      // 使用DOMParser解析HTML字符串
      let parser = new DOMParser();
      let doc = parser.parseFromString(htmlString, "text/html");

      // 查找<a>标签
      let link = doc.querySelector("a");

      // 提取href属性
      if (link) {
        let href = link.href;
        i.link = link.href;
        console.log(i.link);
      } else {
        console.log("没有找到<a>标签");
      }
    }
  });
});

// 点击链接跳转
function goTarget(url) {
  window.open(url, "__blank");
}
</script>

<style scoped lang="less" src="./assets/index.css"></style>
