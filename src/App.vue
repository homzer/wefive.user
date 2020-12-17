<template>
  <v-app>

    <div v-if="this.$route.name!=='login' && this.$route.name!=='app'&&this.$route.name!=='SignIn'&& this.$route.name!=='SignUp'">
      <v-app-bar
              app
              clipped-right
              color="cyan darken-2"
              dark
      >
        <!-- progress linear -->
        <v-progress-linear
                id="progress-linear-2"
                indeterminate
                color="cyan"
                style="display: none"
        ></v-progress-linear>
        <v-app-bar-nav-icon @click.stop="drawerRight=!drawerRight"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title id="mainTitle" style="display: block;font-family: 楷体;font-size: x-large;">欢迎使用指尖武汉</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <!-- right -->
      <v-navigation-drawer
              v-model="drawerRight"
              app
              clipped
              left
      >
        <v-list dense>
          <v-list-item @click.stop="returnHome">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>首页</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click.stop="manageAdmin">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>部门评价</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click.stop="My">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>我的</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click.stop="logout">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>退出</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
    </div>
    <v-main>
      <!-- progress linear -->
      <v-progress-linear
              id="progress-linear"
              indeterminate
              color="cyan"
              style="display: none"
      ></v-progress-linear>
      <router-view/>
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
    drawer: null,
    drawerRight: null,
    drawerLeft: null,
    right: false,
    transDrawer: false,
  }),
  components: {

  },
  methods: {
    // 查看管理员列表
    manageAdmin() {
      // 跳转
      this.$router.push({ name: 'admin' });
    },
    //我的界面跳转
    My(){
      this.$router.replace({ name: 'trans' });
    },
    // 返回主页
    returnHome() {
      this.$router.replace({ name: 'home' });
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
