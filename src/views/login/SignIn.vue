<template>
  <div class="big-box">
    <div class="big-contain">
      <div class="btitle">账号登录</div>
      <div class="bform">
        <v-form v-model="valid">
          <v-text-field
                  label=""
                  placeholder="用户名(电话号码)"
                  outlined
                  value=""
                  id="phone"
                  dense
                  single-line
                  :rules="phoneRules"
          ></v-text-field>
          <!--<v-text-field label="用户名(电话号码)" value="" id="phone" :rules="phoneRules"></v-text-field>-->
          <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  :type="show ? 'text' : 'password'"
                  name="password"
                  id="password"
                  label="密码"
                  value=""
                  @click:append="show = !show"
                  single-line
                  outlined
                  dense
          ></v-text-field>
        </v-form>
      </div>

      <v-btn rounded color="cyan darken-2" width="50%" max-width="220"  dark @click="SendLoginInfo">登录</v-btn>
      <v-btn rounded color="cyan darken-2" width="50%" max-width="220" class="my-5" dark @click="back">返回</v-btn>
    </div>
  </div>
</template>

<script>
  import loginService from "../../service/loginService";

  export default {
    name: "SignIn",
    data () {
      return {
        show: false,
        valid: false,
        user: {
          phone: "",
          password: "",
          userId: "",
          name: "",
        },
        phoneRules: [
          v => !!v || '电话号码不能为空',
          v => v.length === 11 || '电话号码不规范',
        ],
        passwordRules: [
          v => !!v || '密码不能为空',
          v => v.length >= 6 || '密码长度至少为6位',
        ],
      }
    },
    methods: {
      SendLoginInfo() {
        if(!this.valid) {
          return;
        }

        let phone = document.getElementById("phone").value;
        let password = document.getElementById("password").value;
        let that = this;
        loginService.sendLoginInfo(phone, password).then((res) => {
          if (res.data.code !== 200) {
            alert(res.data.msg);
            return null;
          }

          that.user.password = res.data.user.password;
          that.user.phone = res.data.user.phone;
          that.user.cardId = res.data.user.cardId;
          that.user.userId = res.data.user.userId;
          that.user.name = res.data.user.name;

          let token = "abc";
          let user = that.user;
          // 本地储存用户信息和Token
          this.$store.dispatch('userModule/storeUserInfo', {user, token});
          this.$router.push({ name: 'home' , params: { "tab": "tabs-1" }});
        }).catch((err) => {
          alert(err);
        })
      },
      back() {
        this.$router.go(-1);
      },
    }

  }
</script>

<style scoped>
  .big-box{
    font-family: 楷体;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    transform: translateX(0%);
    transition: all 1s;

  }
  .big-contain{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btitle{
    font-size: 2em;
    font-weight: bold;
    color: rgb(57,167,176);
  }
  .bform{
    width: 100%;
    height: 40%;
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: rgb(57,167,176);
  }
  .bform .errTips{
    display: block;
    width: 50%;
    text-align: left;
    color: red;
    font-size: 0.7em;
    margin-left: 1em;
  }
  .bform input{
    width: 50%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-left: 2em;
    background-color: #f0f0f0;
  }
  .bbutton{
    width: 40%;
    height: 40px;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: rgb(57,167,176);
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
  }
  .big-box.active{
    left: 0;
    transition: all 0.5s;
  }
  .big-box{
    /*background-image: url("https://i.loli.net/2020/12/19/ZHDdQ8Ca1eLoqwv.jpg");*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: bottom;
  }
</style>
