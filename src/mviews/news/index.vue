<template>
  <div class="news-container">
    <div class="news-content">
      <ul class="news-list">
        <li class="news-item" v-for="item in newsList" :key="item.id">
          <newsBox
            :title="item.titles"
            :content="item.content"
            :writer="item.writers"
            :picture="item.picture"
            :date="item.date"
            :links="item.links"
          />
        </li>
      </ul>
    </div>
    
    <!-- 分页器放到内容框外面 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script setup>
import newsBox from "./components/newsBox.vue";
import { ref, onMounted } from "vue";
import { getNewsListApi } from "@/api/news/index.js";

const newsList = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const getNewsList = async () => {
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    };
    const res = await getNewsListApi(params);
    newsList.value = res.rows.map(item => ({
      ...item,
      titles: item.titles.replace(/<[^>]+>/g, "")
    }));
    total.value = res.total;
    
    // 按日期排序
    newsList.value.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('获取新闻列表失败:', error);
  }
};

// 处理每页显示数量变化
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1; // 重置到第一页
  getNewsList();
};

// 处理页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val;
  getNewsList();
};

onMounted(() => {
  getNewsList();
});
</script>

<style lang="less" scoped>
.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  .news-content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin-bottom: 20px; /* 添加底部间距，与分页器分开 */
    
    .news-list {
      list-style: none;
      padding: 0;
      margin: 0;
      
      .news-item {
        margin-bottom: 20px;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
        }
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  
  .pagination-container {
    background: #f8f9fa;
    // padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    
    :deep(.el-pagination) {
      padding: 10px 20px;
      background: #f8f9fa;
      border-radius: 4px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      /* 优化分页器按钮样式 */
      .el-pager li {
        background: transparent;
        &:not(.disabled).active {
          background-color: #409eff;
          color: white;
        }
      }
      
      .btn-prev, .btn-next {
        background: transparent;
      }
    }
  }
}
</style>
