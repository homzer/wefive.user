<template>
    <v-container>
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>创建新动态</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card class="mt-7" flat>
            <v-row justify="center">
                <v-col cols="11">
                    <template>
                        <v-file-input
                                v-model="file"
                                color="cyan darken-2"
                                counter
                                label="File input"
                                placeholder="Select your files"
                                prepend-icon="mdi-paperclip"
                                outlined
                                :show-size="1000"
                        >
                            <template v-slot:selection="{ index, text }">
                                <v-chip
                                        v-if="index < 2"
                                        color="cyan darken-2"
                                        dark
                                        label
                                        small
                                >
                                    {{ text }}
                                </v-chip>

                                <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2"
                                >
                                    +{{ files.length - 2 }} File(s)
                                </span>
                            </template>
                        </v-file-input>
                    </template>
                </v-col>
                <v-col cols="11">
                    <v-textarea
                            label="添加新交流主题"
                            auto-grow
                            outlined
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
        <v-snackbar
                v-model="notCompleted"
                :timeout="2000"
                absolute
                bottom
                left
        >
            不能发表空内容的动态哦！
        </v-snackbar>
    </v-container>
</template>

<script>
    import chatService from "../../service/chatService";

    export default {
        name: "newChat",
        data () {
            return {
                notCompleted: false,
                file: [],
            }
        },

        methods: {
            createNewChat() {
                let content = document.getElementById("content").value;
                if (content.length === 0) {
                    this.notCompleted = true;
                    return null;
                }
                let picture = document.getElementById("picture").value;
                let userId = this.$store.state.userModule.userInfo.userId;
                chatService.createNewChat(userId.toString(), content, picture).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        alert(res.data.msg);
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
