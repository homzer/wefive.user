<template>
  <div>
    <h3>武汉市公安局交流回复区</h3>
    <div class="commentBox">
      <h3 style="margin-top: 10px">交流回复</h3>
      <v-card style="height: 300px;width: 100%">
      </v-card>
    </div>
    <div class="commentBox">
      <h3 style="margin-top: 10px">发表言论</h3>
      <div class="text-area">
      <textarea placeholder="请输入..." style="height: 70px;width: 100%"></textarea>
      </div>
      <button class="butt" @click="addComment">发表</button>
      <button class="butt" @click="canelComment">取消</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AddAdmin",
        data () {
            return {

            }
        },
        mounted: function() {
            this.loadAllUsers();
        },
      methods: {
        addComment: function() {
          this.$emit("submit",this.commentText);
          this.commentText = "";
        },
        canelComment: function() {
          this.$emit("canel");
          this.commentText = "";
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
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: #e9e5df;
  color: #634322;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
