<template>
  <div class="app-container home">
<router-view />
  </div>
  <el-divider />
  <div class="page-bottom">
    <div class="bottomText1">Copyright reserved by Aruo © 2011 •Yan's lab</div>
    <div class="bottomText1">Constructed and Maintained by Liu Jianxiao.    Tel:13476095649.     E-mail:liujianxiao@mail.hzau.edu.cn</div>
    <div class="bottomText2">鄂ICP备11005573号</div>
</div>
</template>

<script setup name="Index">
const version = ref('3.8.8')

function goTarget(url) {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
</style>

