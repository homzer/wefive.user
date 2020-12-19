<template>
  <div class="big-box">
    <div class="big-contain" >
      <div class="btitle">注册账户</div>

      <v-form v-model="valid" class="mt-8">

        <v-text-field
                autocomplete="off"
                placeholder="用户名"
                outlined
                value=""
                id="name"
                dense
                single-line
                :rules="nameRules"
        ></v-text-field>

        <v-text-field
                autocomplete="off"
                placeholder="电话号码"
                outlined
                value=""
                id="phone"
                dense
                single-line
                :rules="phoneRules"
        ></v-text-field>

        <v-text-field
                autocomplete="off"
                placeholder="密码"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show ? 'text' : 'password'"
                name="password"
                id="password"
                value=""
                @click:append="show = !show"
                single-line
                outlined
                dense
        ></v-text-field>

        <v-text-field
                autocomplete="off"
                placeholder="身份证号码"
                outlined
                value=""
                id="cardId"
                dense
                single-line
                :rules="cardIdRules"
        ></v-text-field>
      </v-form>
      <!--<button class="bbutton" @click="sendRegisterInfo()">注册</button>-->
      <v-btn rounded color="cyan darken-2" width="50%" max-width="220" class="my-5" dark @click="sendRegisterInfo()">注册</v-btn>
      <v-btn rounded color="cyan darken-2" width="50%" max-width="220" class="my-5" dark @click="back">返回</v-btn>
    </div>
  </div>
</template>

<script>
  import registerService from "../../service/registerService";

  export default {
    name: "SignUp",
    data () {
      return {
        valid: false,
        phoneRules: [
          v => !!v || '电话号码不能为空',
          v => v.length === 11 || '电话号码长度不对',
        ],
        passwordRules: [
          v => !!v || '密码不能为空',
          v => v.length > 6 || '密码长度不能小于6',
        ],
        cardIdRules: [
          v => !!v || '身份证号码不能为空',
          v => v.length === 18 || '身份证号码长度不对',
        ],
        nameRules: [
          v => !!v || '姓名不能为空',
        ],
      }
    },
    methods: {
      sendRegisterInfo(){
        if(!this.valid) {
          return null;
        }
        let phone = document.getElementById("phone").value;
        let cardId = document.getElementById("cardId").value;
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        registerService.sendRegisterInfo(name,cardId, password,phone).then((res) => {
          if (res.data.code !== 200) {
            alert(res.data.msg);
            return null;
          }
          this.$router.push({ name: 'SignIn' });
        }).catch((err) => {
          alert(err);
        })
      },

      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .big-box{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    transform: translateX(0%);
    transition: all 1s;
    font-family: 楷体;
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
    font-size: 2.0em;
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
    background-image: url("https://i.loli.net/2020/12/19/ZHDdQ8Ca1eLoqwv.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: bottom;
  }
</style>
