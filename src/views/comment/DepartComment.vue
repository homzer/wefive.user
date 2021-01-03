<template>
  <v-container onload="loadDepartment()">
    <v-toolbar flat color="cyan darken-2" dark>
      <v-btn icon @click="back">
        <v-icon>mdi-reply</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>欢迎使用指尖武汉</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- 部门介绍 -->
    <v-card flat>
      <template>
        <v-card
                width="100%"
                class="mx-auto"
        >
          <v-row dense>
            <v-col
                    cols="12"
            >
              <v-card flat :id="department.dept_id">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                            v-text="department.dept_name"
                    ></v-card-title>
                    <v-card-subtitle v-text="department.location"></v-card-subtitle>
                  </div>

                  <v-avatar
                          class="ma-3"
                          size="100"
                          tile
                          v-if="department.picture"
                  >
                    <v-img :src="department.picture"></v-img>
                  </v-avatar>
                </div>

                <v-card-subtitle v-text="department.description"></v-card-subtitle>

              </v-card>

              <v-card-actions>
                <v-btn
                        color="cyan darken-2"
                        large
                        dark
                        width="140"
                        @click="toRoad"
                >
                  路线详情
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        color="cyan darken-2"
                        @click=" show = !show"
                        large
                        dark
                        width="140"
                >
                  我要预约
                </v-btn>
              </v-card-actions>
              <div v-show="show" align="center">
                <label for="meeting" style="font-family: 黑体">预约时间:  </label>
                <input id="meeting" type="date" value="" style="border: 2px solid #c4c7ce; height: 38px;"/>
                <br>
                <input type="radio" v-model="first" value="morn">
                <label >8:30-12:00</label>
                <input type="radio" v-model="first" value="noon"/>
                <label >14:30-17:00</label>

                <v-btn
                        color="cyan darken-2"
                        @click="reserve"
                        dark
                        width="18"
                        height="25"
                        style="float: right"
                >
                  提交
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-card>

    <!-- 折线图 -->
    <v-card class="mt-2" color="cyan darken-2" dark>
      <v-card-title>今日预约及办理人数统计</v-card-title>
      <v-sheet
              class="v-sheet--offset mx-auto align-end"
              elevation="2"
              color="white"
      >
        <v-sparkline
                auto-draw
                :labels="labels"
                :value="value"
                color="cyan darken-2"
                line-width="2"
                padding="16"
        ></v-sparkline>
      </v-sheet>
    </v-card>

    <!-- 部门交流 -->
    <v-card>
      <v-toolbar
              flat
              class="mt-5"
              color="cyan darken-2"
              dark
      >
        <v-toolbar-title>部门咨询</v-toolbar-title>
      </v-toolbar>
      <v-row justify="center">
        <v-col cols="8">
          <v-textarea
                  auto-grow
                  placeholder="我来说一句..."
                  rows="1"
                  outlined
                  color="cyan darken-2"
                  dense
                  value=""
                  id="comment"
                  autocomplete="off"
          ></v-textarea>
        </v-col>
        <v-col cols="3">
          <v-btn
                  width="100%"
                  color="cyan darken-2"
                  dark
                  @click="sendComment"
          >发表</v-btn>
        </v-col>
      </v-row>
      <!-- 交流区 -->
      <v-card flat width="95%" class="mx-auto">

        <v-list
                three-line
                v-for="(item, index) in list"
                :key="index"
        >
          <v-divider v-if="index !== 0"></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2758133744,986223744&fm=26&gp=0.jpg'"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle>普通用户</v-list-item-subtitle>
              <v-list-item-content class="text-sm-body-2" v-html="item.content"></v-list-item-content>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="item.reply"></v-divider>
          <v-list-item v-if="item.reply">
            <v-list-item-avatar>
              <v-img :src="department.picture"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle>政府工作人员</v-list-item-subtitle>
              <v-list-item-content class="text-sm-body-2" v-html="item.reply"></v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>

    <v-snackbar
            v-model="notCompleted"
            :timeout="2000"
            text
            color="cyan darken-2"
            bottom
    >
      您还没有输入任何内容哦！
    </v-snackbar>
    <v-snackbar
            v-model="snackbar"
            :timeout="2000"
            outlined
            color="success"
            text
    ><v-icon color="success">
      mdi-checkbox-marked-circle
    </v-icon>
      感谢您的反馈！
    </v-snackbar>
  </v-container>
</template>

<script>
import departService from "../../service/departService";
import reserveService from "../../service/reserveService";
import commentService from "../../service/commentService";

export default {
  name: "DepartComment",
  data: () => ({
    labels: [
      '12am',
      '2am',
      '4am',
      '6am',
      '8am',
      '10am',
      '12am',
      '2pm',
      '4pm',
      '6pm',
      '8pm',
      '10pm',
      '12pm',
    ],
    value: [0, 0, 0, 3, 12, 9, 45, 46, 77, 79, 15, 5, 4],

    comments:"",
    selected: [2],
    active: false,
    snackbar: false,
    show: false,
    showComment : false,
    notCompleted: false,
    first: '',
    department:{
      dept_name:"",
      description:"",
      work_time:"",
      location:"",
      picture:"",
    },
    usersDepartTalks: [
      {
        user_say:'请问我办理身份证需要什么材料吗？',
        depart_say:'是这样子的，您需要这些材料！',
        time:'2020-12-12',
      },
      {
        user_say:'请问我什么时候可以去？',
        depart_say:'亲是这样子的，您可以在5点之前到哦！',
      },
      {
        user_say:'请问我什么时候可以去？',
        depart_say:'亲是这样子的，您可以在5点之前到哦！',
      },
    ],

    list: [{
      commentId: '',
      userId: '',
      deptId: '',
      busId: '',
      content: '',
      reply: '',
    }],

  }),
  mounted: function() {
    this.loadDepartment();
  },
  methods: {
    loadDepartment() {
        let deptId = this.$route.params.deptId;
        departService.getDepartment(deptId).then((res) => {
          if (res.data.code !== 200) {
            alert(res.data.msg);
          } else {
            this.department = res.data.data.department;
          }
        }).catch((err) => {
          alert(err);
        });
      let userId = this.$store.state.userModule.userInfo.userId;
        commentService.getMyComment(deptId, userId).then((res) => {
          if (res.data.code !== 200) {
            alert(res.data.msg);
          } else {
            this.list = res.data.page.list;
            this.showComment = true;
          }
        }).catch((err) => {
          alert(err);
        });
    },
    sendComment() {
      let content = document.getElementById("comment").value;
      let deptId = this.$route.params.deptId;
      let userId = this.$store.state.userModule.userInfo.userId;
      let reply = "";
      let busId = "";
      if (content.length === 0) {
        this.notCompleted = true;
        return null;
      }
      commentService.sendComment(content, deptId, userId, busId, reply).then((res) => {
        if(res.data.code !==200) {
          alert(res.data.msg);
        } else {
          location.reload();
        }
      })
    },
    toRoad() {
      let deptId = this.$route.params.deptId;
      this.$router.push({name: 'road', params: {"deptId": deptId}});
    },
    //预约
    reserve(){
      const date = document.getElementById("meeting").value;
      let deptId = this.$route.params.deptId;
      if(date===""){
        alert("请选择日期!");
        return;
      }
      if(this.first===""){
        alert("请选择上午或下午！");
        return;
      }
      const today = new Date();
      const day = new Date(date);
      if(day<today){
        alert("预约失败！你只能预约明天之后的日期");
        return;
      }

      let t;
      if(this.first==='noon'){
        t = 2;
      }else{
        t = 1;
      }
      let that = this;
      reserveService.checkPeople(deptId, date,t).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
          return null;
        }
        const b = confirm("现在已经预约" + res.data.nowpeople + "人\n确定要预约吗");

        if(b===true){
          reserveService.reservation(that.$store.state.userModule.userInfo.userId,deptId,
                  date,t).then((res) => {
            if (res.data.code !== 200) {
              alert(res.data.msg);
              return null;
            }
            alert("恭喜你预约成功！");
            location.reload();
          }).catch((err) => {
            alert(err);
          })
        }


      }).catch((err) => {
        alert(err);
      })
    },
    back() {
      this.$router.go(-1);
    },
    addComment(){

    },
    cancelComment(){
      this.comments="";
    },

  }
}
</script>

<style scoped>
.commentBox {width: 100%;}
.commentBox h3 {
  color: #634322;
  background: #e9e5df;
  padding: 8px 15px;
  text-align: left;
  font-size: 16px;
}
.butt{
  width: 20%;
  height: 35px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: #e9e5df;
  color: #634322;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
