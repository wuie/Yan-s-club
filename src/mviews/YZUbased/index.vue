<template>
  <div class="yzubasedContainer">
    <div class="researchBox">
      <div class="YzuBasedHeader">Research</div>
      <el-divider />
      <ul style="list-style-type: none; padding: 0px; margin: 0px">
        <li v-for="item in researchDatas" :key="item.id">
          <researchBox :title="item.title" :content="item.content" />
        </li>
      </ul>
      <el-divider>Maizego Group</el-divider>
      <div class="yzuImages">
        <ul
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            padding: 0%;
            margin: 0%;
          "
        >
          <li
            v-for="i in srcList"
            style="
              padding: 0% 0% 1vh 0%;
              margin: 0%;
              list-style: none;
              width: 45%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              flex-wrap: nowrap;
            "
          >
            <el-image
              style="width: 100%; height: 15vh"
              :src="i"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="srcList"
              :initial-index="4"
              fit="cover"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="teamBox">
      <div class="YzuBasedHeader">Team</div>
      <el-divider />
      <div class="teamHeader">Professor</div>
      <teamBox :PersonDatas="professorDatas" :kind="Professor" />
      <div class="teamHeader">Faculty</div>
      <teamBox :PersonDatas="staffDatas" :kind="Staff" />
      <div class="teamHeader">Postdoctoral assosiate</div>
      <teamBox :PersonDatas="postDocsDatas" :kind="PostDocs" />
      <div class="teamHeader">Ph.D students</div>
      <teamBox :PersonDatas="phdStudenthDatas" :kind="phdStudents" />
      <div class="teamHeader">Master students</div>
      <teamBox :PersonDatas="masterDatas" :kind="Master" />
      <div class="teamHeader">Undergraduate</div>
      <teamBox :PersonDatas="underGraduateDatas" :kind="underGraduate" />
      <!-- 毕业生按钮 -->
      <div class="alumni-button-grid">
        <el-button round style="width: 10vw" @click="toAluminPage"
          >Formers</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup class="hzaubased">
import { ref, onMounted } from "vue";
import useUserStore from "@/store/modules/user.js";
import {
  getResearchListApi,
  getPictListApi,
} from "@/api/YZW-based/research.js";
import {
  getProfessiorListApi,
  getStaffListApi,
  getPhdStudentListApi,
  getUnderGraduateListApi,
  getMasterListApi,
  getPostDocsListApi,
} from "@/api/YZW-based/team.js";
import teamBox from "./components/TeamBox/index.vue";
import researchBox from "./components/ResearchBox/index.vue";
import { useRouter } from "vue-router";

const srcList = ref([]);
const userStore = useUserStore(); // 正确调用store
const baseUrl = computed(() => userStore.baseUrl);
// 引入图片

const router = useRouter();
// 在最大的界面组件下获取research和research  然后遍历将其插入个子组件中
const researchDatas = ref([]);
const staffDatas = ref([]);
const phdStudenthDatas = ref([]);
const underGraduateDatas = ref([]);
const masterDatas = ref([]);
const postDocsDatas = ref([]);
const pictureList = ref([]);
const professorDatas = ref([]);

// 静态数据
const Professor = "professor";
const PostDocs = "master";
const Master = "master";
const Staff = "staff";
const phdStudents = "students";
const underGraduate = "students";

//获取全部professor
const getProfessiorList = async () => {
  const res = await getProfessiorListApi();
  professorDatas.value = res.rows;
};

// 获取全部research
const getResearchList = async () => {
  const res = await getResearchListApi();
  researchDatas.value = res.rows;
};

// 获取全部staff
const getStaffList = async () => {
  const res = await getStaffListApi();
  staffDatas.value = res.rows;
};

// 获取phdstudent
const getPhdStudentList = async () => {
  const res = await getPhdStudentListApi();
  phdStudenthDatas.value = res.rows;
};

// 获取undergraduate
const getUnderGraduateList = async () => {
  const res = await getUnderGraduateListApi();
  underGraduateDatas.value = res.rows;
};

// 获取master
const getMasterList = async () => {
  const res = await getMasterListApi();
  masterDatas.value = res.rows;
};

// 获取PostDocs
const getPostDocsList = async () => {
  const res = await getPostDocsListApi();
  postDocsDatas.value = res.rows;
};

// 获取照片
const getPictList = async () => {
  const res = await getPictListApi();
  pictureList.value = res.rows;
  // 将图片的数据放进list中
};

// 跳转至毕业生按钮
function toAluminPage() {
  router.push({ path: "/index/alumin", query: { kind: "YZW" } });
}

onMounted(() => {
  getResearchList().then(() => {
    // 将title和content文本里面的标签全部拿掉
    for (let i of researchDatas.value) {
      i.title = i.title.replace(/<[^>]+>/g, "");
      i.content = i.content.replace(/<[^>]+>/g, "");
    }
  });
  getStaffList().then(() => {
    // console.log("staff", staffDatas.value);
  });
  getPhdStudentList().then(() => {
    // console.log("phdstudent", phdStudenthDatas.value);
  });
  getUnderGraduateList().then(() => {
    // console.log("undergraduate", underGraduateDatas.value);
  });
  getMasterList().then(() => {
    // console.log("master", masterDatas.value);
  });
  getPostDocsList().then(() => {
    // console.log("postdocs", postDocsDatas.value);
  });
  getProfessiorList().then(() => {});
  getPictList().then(() => {
    console.log("picture", pictureList.value);
    for (let i of pictureList.value) {
      console.log(111);
      console.log(`${baseUrl.value}${i.photo}`);
      srcList.value.push(`${baseUrl.value}${i.photo}`);
    }
  });
});
</script>

<style scoped lang="less" src="./assets/index.css"></style>
