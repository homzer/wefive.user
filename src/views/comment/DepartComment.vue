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
                    <v-card-subtitle v-text="department.description"></v-card-subtitle>
                  </div>

                  <v-avatar
                      class="ma-3"
                      size="125"
                      tile
                      v-if="department.picture"
                  >
                    <v-img :src="department.picture"></v-img>
                  </v-avatar>
                </div>

              </v-card>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="cyan darken-2"
                        @click=" show === i ? show = -1 : show = i "
                        large
                        dark
                        width="180"
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
      <v-card-title>人数统计</v-card-title>
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

    <div class="commentBox" flat color="cyan darken-2">
      <h3 style="margin-top: 10px">发表言论</h3>
      <div class="text-area">
        <label>
          <input
              v-model="comments"
              style="height: 60px;width: 100%"
              placeholder="请输入..."
          />
        </label>
      </div>
      <button class="butt" @click="addComment">发表</button>
      <button class="butt" @click="cancelComment">取消</button>
    </div>
    <v-row>
      <v-col
          v-for="(item, index) in usersDepartTalks"
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
                  <div v-text="item.user_say"></div>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div v-text="item.depart_say"></div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import departService from "../../service/departService";
import reserveService from "../../service/reserveService";

export default {
  name: "DepartComment",
  data: () => ({
    labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
    ],
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
    ],


    comments:"",
    selected: [2],
    active: false,
    show: false,
    first: '',
    department:[
      {
        dept_name:"",
        description:"",
        work_time:"",
        location:"",
        picture:"",
      }
    ],
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
    ]
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
        })
    },
    //预约
    reserve(){
      const date = document.getElementById("meeting").value;
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
      reserveService.checkPeople(4, date,t).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
          return null;
        }
        const b = confirm("现在已经预约" + res.data.nowpeople + "人\n确定要预约吗");

        if(b===true){
          reserveService.reservation(that.$store.state.userModule.userInfo.userId,4,
                  date,t).then((res) => {
            if (res.data.code !== 200) {
              alert(res.data.msg);
              return null;
            }

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
