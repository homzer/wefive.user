<template>
    <div>
<!--      查询方面-->
      <div class="header">
        <div class="mt-1">
          <v-row>
            <input
                v-model="inputValue"
                autofocus="autofocus"
                autocomplete="off"
                placeholder="请输入搜索内容"
                class="new-todo ml-3"
                id="info"
            />
            <v-spacer></v-spacer>
            <v-btn color="cyan darken-2" @click="add" dark style="max-height: 25px;">
              查询
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </div>
      </div>
      <!-- 列表区域 -->
      <div class="main">
        <ul class="todo-list">
          <li class="todo" v-for="(item,index) in list" :key="index">
            <div class="view">
              <span class="index">{{index+1}}.</span>
              <label>{{item}}</label>
              <button class="destroy" @click="remove(index)"></button>
            </div>
          </li>
        </ul>
      </div>
      <!-- 统计和清空 -->
      <div class="footer" v-if="list.length!=0">
        <span class="todo-count" v-if="list.length!=0"><strong>{{list.length}}</strong> 条搜索记录 </span>
        <button class="clear-completed" v-if="list.length!=0" @click="clear">
          清空记录
        </button>
      </div>
<!--      推荐-->
      <br>
      <br>
      <div>
        <h4>推荐：</h4>
        <button @click="GoFind" style="color: grey;font-weight: bolder;font-size: small;">武汉市公安局</button>
        <button @click="GoFind" style="color: grey;font-weight: bolder;font-size: small;margin-left:30px">武昌车管所</button>
        <button @click="GoFind" style="color: grey;font-weight: bolder;font-size: small;margin-left:30px">武汉市人民医院</button>
        <button @click="GoFind" style="color: grey;font-weight: bolder;font-size: small;margin-left:30px">武汉市武昌区公安局</button>
        <button @click="GoFind" style="color: grey;font-weight: bolder;font-size: small;margin-left:30px">武汉市财务部</button>
      </div>
<!--      交流记录-->
      <br>
      <br>
      <div>
        <h4>交流记录：</h4>
        <v-card height="50px">
          <h5>武汉市公安局</h5>
          <bottom @click="GotoTalk" style="color: rgb(57,167,176);font-weight: bolder;font-size: small;">Goto-></bottom>
        </v-card>
        <br>
        <v-card height="50px">
          <h5>武汉市公安局</h5>
          <bottom @click="GotoTalk" style="color: rgb(57,167,176);font-weight: bolder;font-size: small;">Goto-></bottom>
        </v-card>
        <br>
        <v-card height="50px">
          <h5>武汉市公安局</h5>
          <bottom @click="GotoTalk" style="color: rgb(57,167,176);font-weight: bolder;font-size: small;">Goto-></bottom>
        </v-card>
      </div>
    </div>
</template>

<script>
    import store from '../../store'
    export default {
        name: "Admin",
        data() {
            return {
                list: ["武昌区公安局", "武汉市民政厅"],
                inputValue: ""
            };
        },
        mounted: function() {
            this.updateAdminTable();
            this.role = store.state.userModule.userInfo.role;
            this.nowName = store.state.userModule.userInfo.name;
        },
        methods: {
          add: function () {
            if(this.inputValue===""){
              alert("您的输入为空！")
              return
            }else{
              this.list.push(this.inputValue);
              this.inputValue="";
              //let info = document.getElementById("info").value;
              this.$router.push({name: 'SearchAll'});

              /* //未实现
               let userId=this.userId;
               let createTime=this.createTime;
               seekService.getSeekInfo(info,userId,createTime).then((res) => {
                 if (res.data.code !== 200) {
                   alert(res.data.msg);
                   return null;
                 }
                 this.$router.push({name: 'SearchResult'});
               }).catch((err) => {
                 alert(err);
               })*/
            }
          },
          remove: function (index) {
            /*console.log("删除");*/
            /*console.log(index);*/
            //删除index的一个元素
            this.list.splice(index, 1);
          },
          clear: function () {
            this.list = [];
          },
          GotoTalk(){
            this.$router.replace({ name: 'addAdmin' });
          },
          GoFind(){
            this.$router.replace({ name: 'addAdmin' });
          }
        },
    };
</script>

<style scoped>
.new-todo{
  width: 210px;
  height: 25px;
  background: none;
  border: 1px solid #190e09;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 120%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 420px;
  overflow: auto;
}

.todo-list li {
  position: relative;
  font-size: 15px;
  border-bottom: 1px solid #ededed;
  height: 25px;
  box-sizing: border-box;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li .destroy {
  /*display: none;*/
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 30px;
  height: 30px;
  margin: auto 0;
  font-size: 15px;
  color: #cc9a9a;
  margin-bottom: 1px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  /*color: #af5b5e;*/
}

.todo-list li .destroy:after {
  content: "x";
}

.todo-list li:hover .destroy {
  display: block;
}
.footer {
  color: #777;
  padding: 10px 15px;
  height: 12px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
}

.clear-completed:hover {
  text-decoration: underline;
}

</style>
