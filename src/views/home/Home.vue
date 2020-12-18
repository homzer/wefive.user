<template>
  <div onload="getSearchRecommend()">
    <v-img
        class="white--text align-end"
        height="200px"
        width="450px"
        style="margin: auto;"
        color="darkgray"
        src="http://5b0988e595225.cdn.sohucs.com/images/20180607/b9e8dd1a30df4d6ab7929af7b54af725.jpeg"
    ></v-img>
    <!-- 输入框 -->
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
          <v-btn color="cyan darken-2" @click="toSearchResult" dark style="max-height: 25px;">
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
    <div class="footer" v-if="list.length!==0">
      <span class="todo-count" v-if="list.length!==0"><strong>{{list.length}}</strong> 条搜索记录 </span>
      <button class="clear-completed" v-if="list.length!==0" @click="clear">
        清空记录
      </button>
    </div>
    <br>
    <br>
    <div>
      <h4>查询推荐：</h4>
      <button v-for="(item, index) in searchRecommend"
              id="recommendation"
              :key="index"
              @click="GoFind"
              style="color: grey;font-weight: bolder;font-size: small;">
        {{item}}
      </button>
    </div>
  </div>
</template>

<script>
//import seekService from "../../service/seekService";
import searchRecommendService from "../../service/searchRecommendService";
import searchHistoryService from "../../service/searchHistoryService";
    export default {
      name: "Home",
      data () {
        return {
          list: [],
          inputValue: "",
          searchRecommend: [""],
        }
      },

      mounted: function() {
            this.getSearchRecommend();
            this.getSearchHistory();
        },
      methods: {
        //获得搜索推荐
        getSearchRecommend(){
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth()+1;
          let day = date.getDate();
          let time = year+'-'+month+'-'+day;
          searchRecommendService.getSearchRecommend(time).then((res) => {
            if (res.data.code !== 200) {
              alert(res.data.msg);
              return null;
            }
            this.searchRecommend = res.data.top;
          }).catch((err) => {
            alert(err);
          });
        },

        //获得搜索记录
        getSearchHistory(){
          let that = this;
          searchHistoryService.getSearchHistory(that.$store.state.userModule.userInfo.userId).then((res) => {
            if (res.data.code !== 200) {
              alert(res.data.msg);
              return null;
            }
            /*alert(res.data.history.length);*/
            for(var i=0;i<res.data.history.length;i++){
              that.list.push(res.data.history[i].info);
            }
          }).catch((err) => {
            alert(err);
          });
        },

        GoFind(){
          let recommendation = document.getElementById("recommendation").value;
          this.$router.push({name: 'searchDepartment', params: {'info': recommendation} });
        },

        toSearchResult() {
          if(this.inputValue===""){
            alert("您的输入为空！")
            return null;
          }
          let info = document.getElementById("info").value;
          this.$router.push({ name: 'searchDepartment', params: {'info': info} });
        },

        /*add: function () {
          if(this.inputValue===""){
            alert("您的输入为空！")
            return null;
          }
          this.list.push(this.inputValue);
          this.inputValue="";
          let info = document.getElementById("info").value;

          let userId=this.$store.state.userModule.userInfo.userId;
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth()+1;
          let day = date.getDate();
          let createTime = year+'-'+month+'-'+day;

          seekService.getSeekInfo(info,userId,createTime).then((res) => {
            if (res.data.code !== 200) {
              alert(res.data.msg);
              this.departments = res.data.departments;
              return null;
            }
            this.$router.push({name: 'searchDepartment'});
          }).catch((err) => {
            alert(err);
          });
        },*/

        remove: function (index) {
          /*console.log("删除");*/
          /*console.log(index);*/
          //删除index的一个元素
          this.list.splice(index, 1);
        },

        clear: function () {
          this.list = [];
        }
      },
    };
</script>

<style scoped>
/*input框*/
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
