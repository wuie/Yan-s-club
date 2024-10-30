<template>
  <!-- ... existing code ... -->
  <el-menu
    class="menu"
    :default-active="activeIndex"
    @select="handleSelect"
    :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
    :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
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
    <!-- 移除了 YZW-based 菜单项 -->
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
    <el-menu-item index="7">
      <router-link
        class="nav-link"
        :class="{ active: activeIndex === '7' }"
        :to="{ name: 'ContactUs' }"
        >Contact Us</router-link
      >
    </el-menu-item>
  </el-menu>
  <!-- ... rest of the template ... -->
</template>
