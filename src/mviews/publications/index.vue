<template>
  <div class="publicationsContainer">
    <div class="pulicationDate">
      <div class="publicTitle">Time</div>
      <el-divider />
      <ul style="list-style-type: none; padding: 0; margin: 0;padding-top:2vh;">
        <li v-for="item in yearLastPositions" :key="item.year">
          <div
            class="year"
            @click="updateSliceArticlesByYear(item.year)"
            :class="{ select: item.year == selectYear }"
          >
            {{ item.year }}
          </div>
        </li>
      </ul>
    </div>
    <div class="publicationNewsContainer">
      <div class="publicTitle">News</div>
      <el-divider />
      <ul style="list-style-type: none; padding: 0; margin: 0">
        <li v-for="item in sliceArticles" :key="item.id">
          <publicationNews
            :title="item.title"
            :writers="item.writers"
            :date="item.date"
            :pdf="item.pdf"
          />
        </li>
      </ul>
      <!-- 新闻box -->
    </div>
  </div>
</template>

<script setup class="publications">
import { ref, reactive, onMounted } from "vue";
import publicationNews from "./conponents/publicationNews.vue";
import { getPublicationsListApi } from "@/api/publications/index.js";

// 放置所有发表论文列表
const publicationDatas = ref([]);
// 放置所有年份列表
const yearLastPositions = reactive([]);
// 设置当前变色年份
const selectYear = ref("2024");

// 获取全部publications
const getPublicationsList = async () => {
  const res = await getPublicationsListApi();
  publicationDatas.value = res.rows;
};

// 切片后应该存在于首页的所有文章
const sliceArticles = reactive([]);

// 更新切片文章列表
// a为文章开始位置，b为结束位置
const updateSliceArticles = (a, b) => {
  sliceArticles.length = 0; // 清空当前切片文章列表
  for (let i = a; i <= b && i < publicationDatas.value.length; i++) {
    sliceArticles.push(publicationDatas.value[i]);
  }
};

// 更新sliceArticles为指定年份的所有文章
const updateSliceArticlesByYear = (year) => {
  sliceArticles.length = 0; // 清空当前切片文章列表

  // 遍历publicationDatas找到指定年份的所有文章
  publicationDatas.value.forEach((article) => {
    const articleYear = article.date.split("-")[0];
    if (articleYear === year) {
      sliceArticles.push(article);
    }
  });
  // 将现在被点击的年份绑定上变色样式
  selectYear.value = year;
  console.log(selectYear.value);
  console.log("点击后select数据类型", typeof selectYear.value);
  console.log("点击后此事被选择的年份", year, "此时此年份的类型,", typeof year);
  console.log("点击后的比较", year === selectYear.value);
};

onMounted(() => {
  getPublicationsList().then(() => {
    // 对所有文章按照年份进行排序
    publicationDatas.value.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log("publicationsNow:", publicationDatas.value);
    selectYear.value=publicationDatas.value[0].year
    console.log("初始年份：", selectYear.value);
    console.log(typeof selectYear.value);

    const yearCounts = {};

    // 遍历文章列表，更新年份计数
    publicationDatas.value.forEach((article, index) => {
      const year = article.date.split("-")[0];
      if (!yearCounts[year]) {
        yearCounts[year] = 0;
      }
      yearCounts[year]++;
    });

    // 提取年份并记录每个年份最后一篇文章的位置及文章数
    let lastYear = null;
    let lastPosition = null;
    let currentYearCount = 0;
    yearLastPositions.length = 0; // 清空数组（虽然这里我们使用了reactive，但清空是个好习惯）

    publicationDatas.value.forEach((article, index) => {
      const year = article.date.split("-")[0];
      if (year !== lastYear) {
        if (lastYear !== null) {
          yearLastPositions.push({
            year: lastYear,
            position: lastPosition,
            sumNum: currentYearCount,
          });
        }
        lastYear = year;
        lastPosition = index;
        currentYearCount = 1; // 重置当前年份的文章计数
      } else {
        currentYearCount++; // 如果年份相同，增加计数
      }
    });

    // 添加最后一个年份的条目
    if (lastYear !== null) {
      yearLastPositions.push({
        year: lastYear,
        position: lastPosition,
        sumNum: currentYearCount,
      });
    }

    // 输出结果
    console.log("每个年份最后一篇文章的位置:", yearLastPositions);
    if (yearLastPositions.length > 1) {
      updateSliceArticles(0, yearLastPositions[1].position - 1);
    } else {
      console.log("Not enough years to slice articles.");
    }
  });
});
</script>

<style scoped lang="less" src="./assets/index.css"></style>
<!-- 
原               现
underGraduate   Professior
staff         faculty
postdocs      Postdoctoral assosiate
PhdStudents    Ph.D students
Master          Master students



-->