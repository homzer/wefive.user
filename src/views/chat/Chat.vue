<template>
    <v-container onload="loadChat()">
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>动态详情</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <!-- 标题区 -->
        <v-card flat>
            <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                    <v-avatar color="cyan darken-2" class="mt-2" size="35">
                        <v-icon dark v-if="!chat.avatar">
                            mdi-account-circle-outline
                        </v-icon>
                        <v-img v-else :src="chat.avatar" alt="U">
                        </v-img>
                    </v-avatar>
                    <span class="ml-4" v-if="chat.name && chat.name.length > 0">{{ chat.name }}</span>
                    <span class="ml-4" v-else>匿名用户</span>
                    <v-card-text v-text="chat.content"></v-card-text>
                    <v-img
                            :src="chat.picture"
                            max-width="400"
                            width="60%"
                    ></v-img>
                    <v-card-actions>
                        <v-row>
                            <v-col>
                                <v-btn icon @click="likeIt">
                                    <v-icon v-if="!like">
                                        mdi-heart-outline
                                    </v-icon>
                                    <v-icon
                                            v-else
                                            color="red darken-1"
                                    >
                                        mdi-heart
                                    </v-icon>
                                </v-btn>
                                <span class="subheading mr-2">{{ chat.likes }}</span>
                                <v-icon class="mx-1">
                                    mdi-message-outline
                                </v-icon>
                                <span class="subheading mr-2">{{ chat.discussions }}</span>
                            </v-col>
                        </v-row>

                    </v-card-actions>
                </div>
            </div>
        </v-card>

        <v-divider color="black"></v-divider>
        <!-- 留言区 -->
        <v-card flat class="mt-6">
            <v-row>
                <v-col cols="9">
                    <v-textarea
                            auto-grow
                            placeholder="我来说一句..."
                            rows="1"
                            outlined
                            color="cyan darken-2"
                            dense
                            value=""
                            id="subChat"
                            autocomplete="off"
                    ></v-textarea>
                </v-col>
                <v-col cols="1">
                    <v-btn
                            color="cyan darken-2"
                            dark
                            large
                            @click="createSubChat"
                    >
                        回复
                    </v-btn>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col
                        v-for="(item, i) in subChats"
                        :key="i"
                        cols="12"
                >
                    <v-card flat>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-avatar color="cyan darken-2" class="mt-2" size="35">
                                    <v-icon dark v-if="!item.avatar">
                                        mdi-account-circle-outline
                                    </v-icon>
                                    <v-img v-else :src="item.avatar" alt="U">
                                    </v-img>
                                </v-avatar>
                                <span class="ml-4" v-if="item.name">{{ item.name }}</span>
                                <span class="ml-4" v-else>匿名用户</span>
                                <v-btn
                                        :id="item.sub_id"
                                        v-if="$store.state.userModule.userInfo.userId === item.user_id"
                                        text
                                        small
                                        right
                                        color="grey"
                                        @click="deleteSubChat"
                                >删除</v-btn>
                                <v-card-text v-text="item.content"></v-card-text>
                                <v-img
                                        v-if="item.picture"
                                        :src="item.picture"
                                        max-width="400"
                                        width="60%"
                                ></v-img>
                            </div>
                        </div>
                        <v-divider
                                v-if="i < subChats.length - 1"
                                :key="i"
                        ></v-divider>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    import chatService from "../../service/chatService";

    export default {
        name: "comment",
        data () {
            return {
                like: false,
                chat: {
                    chat_id: '',
                    content: '',
                    discussions: '',
                    likes: '',
                    picture: '',
                    user_id: '',
                    name: '',
                    avatar: '',
                },
                comment: {
                    user_id: '',
                    picture: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00201-399.jpg',
                    content: '到户口所在地的派出所申请领取第二代居民身份证时，应该提前准备好相应的证件，一般只需要准备好户口本就行了，到了派出所后工作人员会根据情况帮忙进行办理。',
                    likes: "13",
                    discussion: "2",
                },
                user: {
                    user_id: "",
                    avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
                    user_name: "福尔摩斯",
                },

                subComments: [
                    {
                        user_id: '1',
                        picture: '',
                        avatar: "",
                        user_name: "",
                        content: '不懂啊！',
                    },
                    {
                        user_id: '2',
                        picture: '',
                        avatar: "",
                        user_name: "",
                        content: '年满十六周岁的本市户籍公民',
                    },
                ],

                subChats: [{
                    sub_id: '',
                    chat_id: '',
                    user_id: '',
                    content: '',
                    picture: '',
                    avatar: '',
                    name: '',
                }],
            }
        },
        mounted: function() {
            this.loadChat();
        },
        methods: {
            loadChat() {
                let chatId = this.$route.params.chatId;
                chatService.getChatByChatId(chatId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.chat = res.data.data.chat;
                    }
                }).catch((err) => {
                    alert(err);
                });

                chatService.getSubChats(chatId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.subChats = res.data.data.subChats;
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            createSubChat() {
                let chatId = this.$route.params.chatId;
                let content = document.getElementById("subChat").value;
                if (content.length === 0) {
                    return null;
                }
                let userId = this.$store.state.userModule.userInfo.userId;
                chatService.createSubChat(chatId, content, userId.toString()).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            deleteSubChat(event) {
                let subId = event.currentTarget.id;
                chatService.deleteSubChat(subId.toString()).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        location.reload();
                    }
                }).catch((err) => {
                    alert(err);
                });
            },


            likeIt() {
                let chatId = this.$route.params.chatId;
                if (this.like) {
                    this.like = false;
                    this.chat.likes -= 1;
                    return null;
                }
                this.like = true;
                this.chat.likes += 1;
                chatService.likeChat(chatId);
            },
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>
