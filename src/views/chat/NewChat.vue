<template>
    <v-container>
        <v-row justify="center">
            <v-card max-width="500">
                <v-toolbar flat color="cyan darken-2" dark>
                    <v-btn icon @click="back">
                        <v-icon>mdi-reply</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>创建新动态</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form v-model="valid">
                    <v-card class="mt-7" flat>
                        <v-row justify="center">
                            <v-col cols="11">
                                <v-textarea
                                        label="添加新交流主题"
                                        auto-grow
                                        outlined
                                        rows="1"
                                        :rules="titleRules"
                                        :counter="50"
                                        row-height="25"
                                        shaped
                                        value=""
                                        id="title"
                                        color="cyan darken-2"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="11">
                                <v-textarea
                                        label="输入内容..."
                                        auto-grow
                                        outlined
                                        :rules="notNullRules"
                                        rows="3"
                                        row-height="25"
                                        shaped
                                        value=""
                                        id="content"
                                        color="cyan darken-2"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="11">
                                <v-textarea
                                        label="图片URL地址"
                                        auto-grow
                                        outlined
                                        rows="1"
                                        row-height="25"
                                        shaped
                                        value=""
                                        id="picture"
                                        color="cyan darken-2"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="11" >
                                <v-btn
                                        color="cyan darken-2"
                                        dark
                                        large
                                        class="ma-2"
                                        width="95%"
                                        @click="createNewChat"
                                >
                                    添加新动态
                                </v-btn>
                                <v-btn
                                        large
                                        color="cyan darken-2"
                                        outlined
                                        width="95%"
                                        class="ma-2"
                                        @click="back"
                                >
                                    取消发布
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-form>

                <v-snackbar
                        v-model="notCompleted"
                        :timeout="2000"
                        absolute
                        bottom
                        left
                >
                    相关信息请填写正确！
                </v-snackbar>
            </v-card>
        </v-row>

    </v-container>
</template>

<script>
    import chatService from "../../service/chatService";

    export default {
        name: "newChat",
        data () {
            return {
                notCompleted: false,
                valid: false,
                file: [],
                titleRules: [
                    v => !!v || '此项不能为空',
                    v => v.length <= 50 || '必须小于50个字符',
                ],
                notNullRules: [
                    v => !!v || '此项不能为空',
                ],
                length50Rules: [
                    v => v.length <= 50 || '必须小于50个字符',
                ],
            }
        },

        methods: {
            createNewChat() {
                if (!this.valid) {
                    this.notCompleted = true;
                    return null;
                }
                let content = document.getElementById("content").value;
                let picture = document.getElementById("picture").value;
                let title = document.getElementById("title").value;
                let userId = this.$store.state.userModule.userInfo.userId;
                chatService.createNewChat(userId.toString(), content, title, picture).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert(res.data.msg);
                        this.back();
                    }
                }).catch((err) => {
                    alert(err);
                })

            },
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>
