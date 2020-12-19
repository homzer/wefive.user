<template>
    <v-container>
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
                        <v-icon dark v-if="!user.avatar">
                            mdi-account-circle-outline
                        </v-icon>
                        <v-img v-else :src="user.avatar" alt="U">
                        </v-img>
                    </v-avatar>
                    <span class="ml-4" v-if="user.user_name && user.user_name.length > 0">{{ user.user_name }}</span>
                    <span class="ml-4" v-else>匿名用户</span>
                    <v-card-text v-text="comment.content"></v-card-text>
                    <v-img
                            :src="comment.picture"
                            max-width="400"
                            width="60%"
                    ></v-img>
                    <v-card-actions>
                        <v-row>
                            <v-col>
                                <v-btn icon @click="like = !like">
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
                                <span class="subheading mr-2">{{ comment.likes }}</span>
                                <v-icon class="mx-1">
                                    mdi-message-outline
                                </v-icon>
                                <span class="subheading mr-2">{{ comment.discussion }}</span>
                            </v-col>
                        </v-row>

                    </v-card-actions>
                </div>
            </div>
        </v-card>

        <v-divider color="black"></v-divider>
        <!-- 留言区 -->
        <v-card flat class="mt-6">
            <v-row dense>
                <v-col
                        v-for="(item, i) in subComments"
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
                                <span class="ml-4" v-if="item.user_name">{{ item.user_name }}</span>
                                <span class="ml-4" v-else>匿名用户</span>
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
                                v-if="i < subComments.length - 1"
                                :key="i"
                        ></v-divider>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "comment",
        data () {
            return {
                like: false,
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

                /*subComments: [{
                    user_id: '',
                    picture: '',
                    content: '',
                }],
                subUsers: [{
                    user_id: "",
                    avatar: "",
                    user_name: "",
                }],*/
            }
        },

        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>
