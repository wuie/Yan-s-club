<template>
  <div >
    <img src="http://43.143.215.172:8443/profile/upload/2024/08/14/OIP-C%20(2)_20240814094509A027.jpg" 
    @error="handleImageError"  
    @click="hello"
    />
  </div>
</template>

<script>
import { defineProps,onMounted } from 'vue';
const props = defineProps({src:String});
const avater = "";
// 当头像无法显示时为其加上一个默认地址
const defaultImageUrl='@/mviews/YZUbased/assets/img/SketchPngb245184315b332e02d09cf5aee8d160bd8546fb2305c53ed6d12bec861e98045.png'  
function handleImageError(event) {  
      // 图片加载失败时，将imageSrc更改为默认图像URL  
      avater = defaultImageUrl;  
      // 可选：如果需要在控制台中看到错误，可以取消注释以下行  
      // console.error('Failed to load image:', event);  
    }  

function hello(){
  console.log('点击了头像');
  console.log(props)
}
export default {
  name: "PentagonAvatar",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
onMounted(()=>{
  avater = "http://43.143.215.172:8443/profile/upload/2024/08/14/OIP-C%20(2)_20240814094509A027.jpg"
  console.log('此时props：',props);
  console.log('此时头像：',avater)
})
</script>

<style scoped>

</style>
