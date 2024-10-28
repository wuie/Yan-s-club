<template>
  <div
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark'
          ? variables.menuBackground
          : variables.menuLightBackground,
    }"
  >
    <img
      src="@/assets/images/image.png"
      alt=""
    />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <!-- 将侧边导航栏改为顶部导航栏 -->
      <!--   :collapse="isCollapse" -->
      <el-menu
        class="menu"
        :default-active="activeIndex"
        @select="handleSelect"
        :background-color="
          sideTheme === 'theme-dark'
            ? variables.menuBackground
            : variables.menuLightBackground
        "
        :text-color="
          sideTheme === 'theme-dark'
            ? variables.menuColor
            : variables.menuLightColor
        "
        :unique-opened="true"
        active-text-color="orange"
        :collapse-transition="false"
        mode="horizontal"
      >
        <el-menu-item index="1">
          <router-link
            :to="{ name: 'Home' }"
            class="nav-link"
            :class="{ active: activeIndex === '1' }"
            >Home</router-link
          >
        </el-menu-item>
        <el-menu-item index="2">
          <router-link
            class="nav-link"
            :class="{ active: activeIndex === '2' }"
            :to="{ name: 'Hzaubased' }"
            >HZAU-based</router-link
          >
        </el-menu-item>
        <el-menu-item index="3">
          <router-link
            class="nav-link"
            :class="{ active: activeIndex === '3' }"
            :to="{ name: 'Yzubased' }"
            >YZW-based</router-link
          >
        </el-menu-item>
        <el-menu-item index="4">
          <router-link
            class="nav-link"
            :class="{ active: activeIndex === '4' }"
            :to="{ name: 'HZAUPublications' }"
            >Publications</router-link
          >
        </el-menu-item>
        <el-menu-item index="5">
          <router-link
            class="nav-link"
            :class="{ active: activeIndex === '5' }"
            :to="{ name: 'HZAUResources' }"
            >Resources</router-link
          >
        </el-menu-item>
        <el-menu-item index="6">
          <router-link
            class="nav-link"
            :class="{ active: activeIndex === '6' }"
            :to="{ name: 'HZAUNews' }"
            >News</router-link
          >
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.module.scss";
import useAppStore from "@/store/modules/app";
import useSettingsStore from "@/store/modules/settings";
import usePermissionStore from "@/store/modules/permission";

defineProps(["sendAppMainRouter"]);
const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

const activeIndex = ref(1);
const handleSelect = (index) => {
  // 更新当前激活的导航项
  activeIndex.value = index;
  console.log(index);
  // 这里可以添加其他逻辑，如路由跳转（但通常<router-link>已经处理了路由）
};
</script>

<style scoped>
.nav-link {
  color: aliceblue;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size:2.4vh;
}
.bar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white !important;
}
.menu {
  background-color: black;
  height: 6vh;
  justify-content: space-around;
  /* background-color: red; */
  display: flex;
  justify-content: space-around;
}
.active {
  color: orange; /* 激活时的文字颜色 */
}

img{
   display: block; 
   height: 18vh; 
   padding: 0vh 0vh 0vh 0vh;
}
@media (max-aspect-ratio: 4/3) { 
  img{
    display: block; 
   height: 12vh; 
   padding: 0;
  }
}
</style>
