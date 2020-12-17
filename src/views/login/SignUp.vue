<template>
  <div class="big-box">
    <div class="big-contain" >
      <div class="btitle" >注册账户</div>

      <v-form v-model="valid">
        <v-text-field label="用户名" value="" id="name" :rules="nameRules"></v-text-field>
        <v-text-field label="电话号码" value="" id="phone" :rules="phoneRules"></v-text-field>
        <v-text-field label="密码" id="password" value="" :rules="passwordRules"></v-text-field>
        <v-text-field label="身份证号码" value="" id="cardId" :rules="cardIdRules"></v-text-field>
      </v-form>
      <button class="bbutton" @click="sendRegisterInfo()">注册</button>
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
</style>