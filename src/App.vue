<template>
  <v-app>
    <!--<v-card>
      <v-toolbar flat color="cyan darken-2" dark>

        <v-spacer></v-spacer>
        <v-toolbar-title>欢迎使用指尖武汉</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs
                  v-model="tabs"
                  fixed-tabs
                  background-color="cyan darken-2"
          >
            <v-tabs-slider color="cyan darken-2"></v-tabs-slider>
            <v-tab
                    :href="homeHref"
            >
              <v-icon>mdi-magnify</v-icon>
              搜索
            </v-tab>

            <v-tab
                    href="#tabs-2"
            >
              <v-icon>mdi-message</v-icon>
              交流
            </v-tab>

            <v-tab
                    :href="userHref"
            >
              <v-icon>mdi-account-box</v-icon>
              我的
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-card>-->
    <v-main>
      <v-row justify="center">
        <v-card width="500" flat>
          <router-view/>
        </v-card>
      </v-row>

    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  props: {
    source: String,
  },
  data: () => ({
    tabs: null,
    homeHref: "http://10.127.229.228:8001/home",
    userHref: "http://10.127.229.228:8001/userCenter",

  }),
  components: {

  },
  methods: {
    //我的界面跳转
    My(){
      this.$router.replace({ name: 'trans' });
    },
    // 登出
    logout() {
      // 跳转登录页
      this.$router.replace({ name: 'login' });
      // 清除用户信息
      this.$store.dispatch('userModule/logout').then(() => {
      }).catch((err) => {
        console.log("清除用户缓存失败，错误信息：", err);
      });
    },

  },
};
</script>
<style scoped>

</style>
