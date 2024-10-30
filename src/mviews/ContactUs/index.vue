<template>
  <div class="contact-us">
    <div class="content-wrapper">
      <h1 class="page-title">Ways to reach me.</h1>

      <div class="contact-info">
        <p class="email-info">
          If you have any questions or comments, please mailto Liu Jianxiao:
          <a href="mailto:liujianxiao@mail.hzau.edu.cn" class="email-link"
            >liujianxiao@mail.hzau.edu.cn</a
          >
        </p>
      </div>

      <h2 class="love-emails">I DO love your (e)mails :)</h2>

      <div class="address-info">
        <div class="info-card">
          <div class="text-info">
            <h3 class="institution">
              National Key Laboratory of Crop Genetic Improvement
            </h3>
            <p class="address">
              Huazhong Agricultural University Wuhan 430070, China
            </p>
            <div class="contact-details">
              <p class="tel-title">Tel.:</p>
              <p class="tel-item">
                Yan Jianbing (Ph.D&Professor): <span>86-27-87280110</span>
              </p>
              <p class="tel-item">
                Students' studying room: <span>86-27-87280169</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="map-section">
        <h2>Our Location</h2>
        <div id="allmap" class="map-container">
          <div v-if="isLoading" class="map-loading">
            <el-icon class="loading-icon"><Loading /></el-icon>
            <span>Loading map...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Loading } from "@element-plus/icons-vue";

const isLoading = ref(true);

// 初始化地图
const init = () => {
  // 使用 BMapGL 而不是 BMap
  const map = new window.BMapGL.Map("allmap");
  
  // 华中农业大学的坐标
  const point = new window.BMapGL.Point(114.357452, 30.478498);
  
  // 初始化地图
  map.centerAndZoom(point, 16);
  map.enableScrollWheelZoom(true);
  
  // 添加标记点
  const marker = new window.BMapGL.Marker(point);
  map.addOverlay(marker);
  
  // 添加信息窗口
  const infoWindow = new window.BMapGL.InfoWindow(`
    <div class="map-info-window">
      <h4>National Key Laboratory of Crop Genetic Improvement</h4>
      <p>Huazhong Agricultural University</p>
      <p>Wuhan 430070, China</p>
    </div>
  `, {
    width: 300,
    height: 100,
    title: 'Location Details'
  });
  
  // 点击标记时显示信息窗口
  marker.addEventListener('click', () => {
    map.openInfoWindow(infoWindow, point);
  });
  
  // 默认打开信息窗口
  map.openInfoWindow(infoWindow, point);
  
  isLoading.value = false;
};

const loadMapScript = () => {
  // 检查是否已经加载过
  if (document.querySelector('.loadmap')) {
    return;
  }
  
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.className = "loadmap";
  // 使用 WebGL 版本的 API
  script.src = `https://api.map.baidu.com/api?type=webgl&v=1.0&ak=pmOwjlSU9yRs2pnArNLOO2CbG4EBp5Oa&callback=init`;
  
  script.onerror = () => {
    console.error('百度地图加载失败');
    isLoading.value = false;
  };
  
  window.init = init; // 设置全局回调函数
  document.body.appendChild(script);
};

onMounted(() => {
  loadMapScript();
});
</script>
<style scoped lang="less">
.image-loading,
.map-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
}

::v-deep(.BMap_cpyCtrl) {
  display: none;
}

::v-deep(.anchorBL) {
  display: none !important;
}

#allmap {
  width: 100%;
  height: 400px; // 固定高度更好
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.map-container {
  position: relative;
  width: 80%;
  margin: auto;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 优化移动端体验 */
@media (max-width: 768px) {
  .loading-icon {
    font-size: 1.5rem;
  }

  .map-info-window {
    padding: 0.3rem;
  }

  .map-info-window h4 {
    font-size: 0.9rem;
  }

  .map-info-window p {
    font-size: 0.8rem;
  }
}
</style>
