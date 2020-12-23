<template>
  <v-container>
    <v-toolbar flat color="cyan darken-2" dark>
      <v-btn icon @click="back">
        <v-icon>mdi-reply</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>欢迎使用指尖武汉</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card flat>
      <template>
        <v-card
            width="100%"
            class="mx-auto"
        >


          <v-row dense>
            <v-col
                v-for="(item, i) in departments"
                :key="i"
                cols="12"
            >
              <v-card flat :id="item.dept_id">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                        v-text="item.dept_name"
                    ></v-card-title>
                    <v-card-subtitle v-text="item.dept_location"></v-card-subtitle>
                    <v-card-subtitle v-text="item.dept_desc"></v-card-subtitle>
                  </div>

                  <v-avatar
                      class="ma-3"
                      size="125"
                      tile
                      v-if="item.dept_picture"
                  >
                    <v-img :src="item.dept_picture"></v-img>
                  </v-avatar>
                </div>

              </v-card>

              <v-divider
                  v-if="i < departments.length - 1"
                  :key="i"
              ></v-divider>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-card>

    <div class="commentBox" flat color="cyan darken-2">
      <h3 style="margin-top: 10px">发表言论</h3>
      <div class="text-area">
        <label>
          <input
              v-model="comments"
              style="height: 60px;width: 100%"
              placeholder="请输入..."
          />
        </label>
      </div>
      <button class="butt" @click="addComment">发表</button>
      <button class="butt" @click="cancelComment">取消</button>
    </div>
    <v-row>
      <v-col
          v-for="(item, index) in usersDepartTalks"
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
                  <div v-text="item.user_say"></div>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div v-text="item.depart_say"></div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DepartComment",
  data: () => ({
    comments:"",
    selected: [2],
    active: false,
    departments:[
      {
        dept_name:"洪山区市政府",
        dept_desc:"人民的公仆，爱你哦",
        dept_workTime:"上午8:30-12:00；下午2:30-5:30",
        dept_location:"武汉市集贤路特1号华通花园2号楼",
        dept_picture:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723534203,3190979793&fm=26&gp=0.jpg",
      }
    ],
    usersDepartTalks: [
      {
        user_say:'请问我办理身份证需要什么材料吗？',
        depart_say:'是这样子的，您需要这些材料！',
        time:'2020-12-12',
      },
      {
        user_say:'请问我什么时候可以去？',
        depart_say:'亲是这样子的，您可以在5点之前到哦！',
      },
      {
        user_say:'请问我什么时候可以去？',
        depart_say:'亲是这样子的，您可以在5点之前到哦！',
      },
    ]
  }),

  methods: {
    back() {
      this.$router.go(-1);
    },
    addComment(){

    },
    cancelComment(){
      this.comments="";
    },
  }
}
</script>

<style scoped>
.commentBox {width: 100%;}
.commentBox h3 {
  color: #634322;
  background: #e9e5df;
  padding: 8px 15px;
  text-align: left;
  font-size: 16px;
}
.butt{
  width: 20%;
  height: 35px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: #e9e5df;
  color: #634322;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
