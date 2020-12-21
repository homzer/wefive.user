<template>
  <div v-if="flag === 1">
    <v-toolbar>
      <v-btn @click="$router.go(-1)" color="cyan darken-2" dark>
        返回
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
      <div class="usercenter">
      <div class="user-style">
        <div class="userimg-style" >
          <img v-bind:src="'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=201340457,3408503524&fm=26&gp=0.jpg'"/>
        </div>
        <div class="username-plus">
          <span>{{user.name1}}</span>
        </div>
        <div class="btn-update">
          <span v-on:click="flag = 2">修改</span>
        </div>
      </div>

        <template>
          <v-container fluid>
            <v-row>

              <v-col
                      :cols="12"
              >
                <v-card>
                  <v-img
                          :src="'https://i.loli.net/2020/12/20/iZsuaYNU4cJd8C5.png'"
                          class="white--text align-end"
                          height="200px"
                  >
                  </v-img>
                </v-card>
              </v-col>

              <v-col
                      :cols="12"
              >
                <v-card class="card">
                  <span class="tit">
                    我的信息
                  </span>
                  <v-btn style="background-image: url('https://i.loli.net/2020/12/20/6CtLiIsGcjWkVgh.png');
                          height: 45px; float: right; width: 10px"
                          @click="showInformation">
                  </v-btn>
                </v-card>
              </v-col>


              <div class="mymess" v-show="flag2">
                <i class="fa fa-phone" aria-hidden="true"></i>
                &nbsp;&nbsp;电话<span>{{user.tel1}}</span>
              </div>
              <div class="mymess" v-show="flag2">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                &nbsp;&nbsp;身份证<span id="ID">{{user.cardId1}}</span>
              </div>


              <v-col
                      :cols="12"
              >
                <v-card class="card">
                  <span class="tit">
                    我的足迹
                  </span>
                  <v-btn style="background-image: url('https://i.loli.net/2020/12/20/6CtLiIsGcjWkVgh.png');
                          height: 45px; float: right; width: 10px"
                         >
                  </v-btn>
                </v-card>
              </v-col>
              <v-col
                      :cols="12"
              >
                <v-card class="card">
                  <span class="tit">
                    我的收藏
                  </span>
                  <v-btn style="background-image: url('https://i.loli.net/2020/12/20/6CtLiIsGcjWkVgh.png');
                          height: 45px; float: right; width: 10px"
                         >
                  </v-btn>
                </v-card>
              </v-col>

            </v-row>
          </v-container>
        </template>
    </div>
  </div>


  <div v-else-if="flag === 2" class="form">
    <v-toolbar>
      <v-btn @click="$router.go(-1)" color="cyan darken-2" dark>
        返回
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="usercenter">
      <div class="user-style">
        <div class="userimg-style"><img v-bind:src="'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=201340457,3408503524&fm=26&gp=0.jpg' + user.icon"/></div>
        <div class="username-plus"><span>{{user.name1}}</span></div>
        <div class="btn-update"><span v-on:click="flag = 1">取消</span></div>
      </div>
    </div>
    <div class="input-control" style="margin-top:50px">
      <input id="name" type="text" name="username" v-model="user.name1" placeholder="昵称"/>
    </div>
    <div class="input-control">
      <input id="password" type="text" name="username" v-model="user.password1" placeholder="请输入新的密码" />
    </div>
    <div class="input-control">
      <input id="phone" type="text" name="username" v-model="user.tel1" placeholder="电话" />
    </div>
    <div class="input-control">
      <input id="cardId" type="text" name="username" v-model="user.cardId1" placeholder="身份证号" />
    </div>
    <div class="button-control">
      <input type="button" name="submit" value="提交" v-on:click="submit"/>
    </div>



  </div>

</template>

<script>
import myInformationService from "../../service/myInformationService";

export default {
  name: 'userCenter',
  data () {
    return {
      flag: 1,
      flag2:false,
      user: {
        name1: '',
        password1: '',
        tel1: '',
        cardId1: ''
      },
      users: {
        name1: '',
        password1: '',
        tel1: '',
        cardId1: ''
      },
    };
  },
  mounted: function (){
    this.getInformation();
  },

  methods: {
    submit:function () {
      let phone = document.getElementById("phone").value;
      let password = document.getElementById("password").value;
      let name = document.getElementById("name").value;
      let cardId = document.getElementById("cardId").value;
      if(password===""){
        alert("密码不能为空！");
        return;
      }
      let that = this;
      myInformationService.sendMyInformation(that.$store.state.userModule.userInfo.userId,name,
          phone,cardId,password).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
          return null;
        }
        that.user.name1 = name;
        that.user.tel1 = phone;
        that.user.password1 = password;
        that.user.cardId1 = cardId;
        that.flag = 1;
        alert("修改成功！")
      }).catch((err) => {
        alert(err);
      })
    },
    getInformation:function () {
      let that = this;
      myInformationService.getMyInformation(this.$store.state.userModule.userInfo.userId).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
          return null;
        }
        that.user.name1 = res.data.users.name;
        that.user.tel1 = res.data.users.phone;
        that.user.password1 = "";
        that.user.cardId1 = res.data.users.cardId;

        console.log(this.user);
      }).catch((err) => {
        alert(err);
      })
    },

    showInformation(){
      this.flag2 = !this.flag2;
    }
  }
}
</script>

<style>

@import '../../../static/css/mymess.css';

  .mymess{
    margin-top: 10px;
    margin-left: 18px;
  }

  .card{
    margin-top: 20px;
    height: 45px;
    font-size: 25px;
    background-color: #777777;
  }
</style>
