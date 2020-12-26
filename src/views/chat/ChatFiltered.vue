<template>
    <v-container onload="loadChats()">
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>相关动态</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card>
            <template>
                <v-card
                        width="100%"
                        class="mx-auto"
                >
                    <v-row dense>
                        <v-col
                                v-for="(item, i) in chats"
                                :key="i"
                                cols="12"
                        >
                            <v-card flat @click="toChat" :id="item.chat_id">
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <div>
                                        <v-card-subtitle v-text="item.title"></v-card-subtitle>
                                        <v-card-text v-text="item.content"></v-card-text>
                                        <v-card-actions>
                                            <v-row>
                                                <v-col>
                                                    <v-icon>
                                                        mdi-heart-outline
                                                    </v-icon>
                                                    <span class="subheading mr-2">{{ item.likes }}</span>
                                                    <v-btn icon>
                                                        <v-icon>
                                                            mdi-message-outline
                                                        </v-icon>
                                                    </v-btn>
                                                    <span class="subheading mr-2">{{ item.discussions }}</span>
                                                </v-col>
                                            </v-row>

                                        </v-card-actions>
                                    </div>

                                    <v-avatar
                                            class="ma-3"
                                            size="125"
                                            tile
                                            v-if="item.picture && item.picture.length > 0"
                                    >
                                        <v-img :src="item.picture"></v-img>
                                    </v-avatar>
                                </div>
                                <v-divider
                                        v-if="i < chats.length - 1"
                                        :key="i"
                                ></v-divider>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </template>
        </v-card>
    </v-container>
</template>

<script>
    import chatService from "../../service/chatService";

    export default {
        name: "ChatFiltered",
        data () {
            return {
                chats: [{
                    chat_id: '',
                    content: '',
                    discussions: '',
                    likes: '',
                    picture: '',
                    title: '',
                }],
            }
        },
        mounted: function() {
            this.loadChats();
        },
        methods: {
            loadChats() {
                let title = this.$route.params.title;
                chatService.getChatsByTitle(title).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.chats = res.data.data.chats;
                    }
                }).catch((err) => {
                    alert(err);
                })
            },
            back() {
                this.$router.go(-1);
            },
            toChat(event) {
                let chatId = event.currentTarget.id;
                this.$router.push({ name: 'chat', params: {'chatId': chatId} });
            },
        }
    }
</script>

<style scoped>

</style>
