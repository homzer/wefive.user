<template>
  <div class="container-fluid">
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
    <div style="min-height: 99vh; ">
      <template>
        <v-container fluid>
          <v-row>
            <v-col
                :cols="12"
            >
              <v-card>
                <h3 class="tit">
                  地点
                </h3>
                <br>
                <p class="res">
                  {{address}}
                </p>
              </v-card>
            </v-col>
            <v-col
                :cols="12"
            >
              <v-card>
                <h3 class="tit">
                  相关材料
                </h3>
                <br>
                <p class="res">
                  {{material}}
                </p>
              </v-card>
            </v-col>
            <v-col
                :cols="6"
            >
              <v-card>
                <h3 class="tit">
                  工作时间
                </h3>
                <br>
                <p class="res">
                  {{workTime}}
                </p>
              </v-card>
            </v-col>
            <v-col
                :cols="6"
            >
              <v-card>
                <h3 class="tit">
                  办理人数
                </h3>
                <br>
                <p class="res">
                  {{peopleCount}}
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

    </div>


  </div>
</template>

<script>
export default {
  name: "SearchResult",
  data(){
    return{
      address:"洪山区雄楚大道5号",
      workTime:"工作日8~10点",
      peopleCount:12,
      material:"①身份证 ②照片"
    }
  },
  methods:{
    back(){
      this.$router.replace({ name: 'home' });
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