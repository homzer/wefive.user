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
    <v-row>
      <v-col
          v-for="(item, index) in materials"
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
                  <div v-text="item.material_name"></div>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div v-text="item.description"></div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="materialDetail"
                color="cyan darken-2"
                :id="index"
                dark
            >
              材料详情
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

<!--  某个材料详情页  -->
    <v-dialog v-if="dialog" v-model="dialog" width="500">
      <v-list three-line subheader>
        <v-subheader>业务材料详情</v-subheader>
        <v-list-item>
          <v-list-item-title>材料名称</v-list-item-title>
          <v-list-item-subtitle>{{materials[currentMaterialId].material_name}}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>材料描述</v-list-item-title>
          <v-list-item-subtitle>{{materials[currentMaterialId].description}}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog">
            关闭
          </v-btn>
        </v-list-item>
      </v-list>
    </v-dialog>
<!--    <v-toolbar>
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

    </div>-->


  </div>
</template>

<script>
import materialService from "../../service/materialService";

export default {
  name: "SearchResult",
  data(){
    return{
      currentMaterialId: "",
      dialog: false,
      address:"洪山区雄楚大道5号",
      workTime:"工作日8~10点",
      peopleCount:12,
      material:"①身份证 ②照片",
      materials: [{
        material_id: "",
        description: "",
        photo_url: "",
        material_name: "",
        bus_id: "",
      }],
    }
  },
  mounted: function (){
    this.getMaterials();
  },
  methods:{
    // 页面加载时根据busId获取所有材料
    getMaterials() {
      let busId = this.$route.params.busId;
      materialService.getMaterials(busId).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
          return null;
        }
        this.materials = res.data.data.materials;
      }).catch((err) => {
        alert(err);
      })
    },

    // 点击查看某个材料的详情
    materialDetail(event) {
      this.currentMaterialId = event.currentTarget.id;
      this.dialog = true;
      // 待实现...
    },

    closeDialog() {
      this.currentMaterialId = '';
      this.dialog = false;
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