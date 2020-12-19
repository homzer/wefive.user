<template>
  <div class="container-fluid" onload="getSearchResult()">
    <v-toolbar>
      <v-btn
          @click="$router.go(-1)"
          color="cyan darken-2"
          dark
      >
        返回
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col
          v-for="(item, index) in departments"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <v-card>
          <v-list three-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <div v-text="item.dept_name"></div>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div v-text="item.work_time"></div>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <div v-text="item.location"></div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="businessDetails"
                color="cyan darken-2"
                :id="item.dept_id"
                dark
            >
              部门业务
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import seekService from "../../service/seekService";

export default {
  name: "SearchDepartment",
  data(){
    return{
      address:"洪山区雄楚大道5号",
      workTime:"工作日8~10点",
      peopleCount:12,
      material:"①身份证 ②照片",
      /*departments: [{
        dept_name:"公安局",
        description:"test",
        location:"洪山区",
        work_time:"8:00-18:00",
        dept_id:1
      }, {
        dept_name:"洪山区公安局",
        description:"test1",
        location:"洪山区",
        work_time:"8:30-18:30",
        dept_id:2
      }],*/
      departments: [{
        dept_name:"",
        description:"",
        location:"",
        work_time:"",
        dept_id: ""
      }],
    }
  },
  mounted: function (){
    this.getSearchResult();
  },
  methods:{
    // 获取搜索结果
    getSearchResult() {
      let info = this.$route.params.info;
      let userId=this.$store.state.userModule.userInfo.userId;
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      let createTime = year+'-'+month+'-'+day;


      seekService.getSeekInfo(info,userId,createTime).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
          return null;
        }
        this.departments = res.data.departments;
      }).catch((err) => {
        alert(err);
      });
    },

    // 进入某个部门的业务页
    businessDetails(event) {
      let deptId = event.currentTarget.id;
      this.$router.push({ name: 'searchBusiness', params: {'deptId': deptId} });
    }
  }
}

</script>

<style scoped>
.tit{
  color: blue;
}
.res{
  font-family: 黑体;
}
.btn1{
  position: relative;
  left: 280px;
  /*background-color: #4CAF50;*/
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>