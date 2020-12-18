<template>
  <v-container onload="getBusiness()">
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
          v-for="(item, index) in businesses"
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
                  <div v-text="item.bus_name"></div>
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
                @click="materialDetails"
                color="cyan darken-2"
                :id="item.bus_id"
                dark
            >
              业务详情
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import businessService from "../../service/businessService";
export default {
  name: "SearchBusiness",
  data: () => ({
    businesses: [{
      bus_id : "",
      bus_name: "",
      description: "",
      cost: "",
      requirement: "",
    }],
  }),
  mounted: function (){
    this.getBusiness();
  },
  methods: {

    // 根据部门id获取所有业务
    getBusiness() {
      let deptId = this.$route.params.deptId;
      businessService.getBusiness(deptId).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
          return null;
        }
        this.businesses = res.data.data.businesses;
      }).catch((err) => {
        alert(err);
      })
    },

    materialDetails(event){
      let busId = event.currentTarget.id;
      this.$router.replace({ name: 'searchMaterial' , params: {"busId": busId}} );
    }
  }
}
</script>

<style scoped>

</style>