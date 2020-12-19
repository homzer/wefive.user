<template>
    <v-container>
        <v-row justify="center">
            <v-card max-width="500" min-width="400">

                <!-- 导航栏 -->
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
                                    href="#tabs-1"
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
                                    href="#tabs-3"
                            >
                                <v-icon>mdi-account-box</v-icon>
                                我的
                            </v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>

                <!-- 内容页 -->
                <v-tabs-items v-model="tabs">

                    <!-- 搜索主界面 -->
                    <v-tab-item value="tabs-1">
                        <!-- 图片+搜索栏 -->
                        <v-card flat>
                            <v-img
                                    class="white--text align-end"
                                    height="300px"
                                    width="100%"
                                    min-width="300"
                                    color="darkgray"
                                    src="http://5b0988e595225.cdn.sohucs.com/images/20180607/b9e8dd1a30df4d6ab7929af7b54af725.jpeg"
                            >
                                <v-row justify="center">
                                    <v-spacer></v-spacer>
                                    <!-- 输入框 -->
                                    <v-col cols="9">
                                        <label for="info"></label>
                                        <input
                                                v-model="inputValue"
                                                autofocus="autofocus"
                                                autocomplete="off"
                                                placeholder="搜索业务和部门"
                                                class="new-todo ml-3"
                                                id="info"
                                        />
                                    </v-col>
                                    <!-- 搜索按钮 -->
                                    <v-col cols="3">
                                        <v-btn id="btn1" color="cyan darken-2" @click="toSearchResult">
                                            查询
                                        </v-btn>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                            </v-img>
                        </v-card>
                        <!-- 部门卡片 -->
                        <v-card flat>
                            <template>
                                <v-card
                                        width="100%"
                                        class="mx-auto"
                                >

                                    <v-app-bar
                                            dark
                                            color="cyan darken-2"
                                            class="mb-1"
                                    >
                                        <v-spacer></v-spacer>

                                        <v-toolbar-title>热搜部门</v-toolbar-title>

                                        <v-spacer></v-spacer>
                                        <v-btn
                                                color="cyan darken-2"
                                                fab
                                                absolute
                                                right
                                        >
                                            <v-icon>mdi-magnify</v-icon>
                                        </v-btn>
                                    </v-app-bar>

                                    <v-row dense>
                                        <v-col
                                                v-for="(item, i) in departments"
                                                :key="i"
                                                cols="12"
                                        >
                                            <v-card flat :id="item.dept_id" @click="toDepartment">
                                                <div class="d-flex flex-no-wrap justify-space-between">
                                                    <div>
                                                        <v-card-title
                                                                v-text="item.dept_name"
                                                        ></v-card-title>
                                                        <v-card-subtitle v-text="item.location"></v-card-subtitle>
                                                        <v-card-text >
                                                            <div><v-icon small>mdi-clock</v-icon>{{item.work_time}}</div>
                                                            <div><v-icon small>mdi-phone</v-icon>{{item.description}}</div>
                                                        </v-card-text>
                                                    </div>

                                                    <v-avatar
                                                            class="ma-3"
                                                            size="125"
                                                            tile
                                                            v-if="item.picture"
                                                    >
                                                        <v-img :src="item.picture"></v-img>
                                                    </v-avatar>
                                                </div>
                                            </v-card>
                                            <v-divider
                                                    v-if="i < comments.length - 1"
                                                    :key="i"
                                            ></v-divider>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </template>
                        </v-card>
                    </v-tab-item>

                    <!-- 交流主界面 -->
                    <v-tab-item value="tabs-2">
                        <!-- 上半部分 -->
                        <v-card flat>
                            <!-- 筛选热门问题 -->
                            <v-card-actions>
                                <v-row class="mt-5">
                                    <v-col cols="9">
                                        <v-text-field
                                                hide-details
                                                prepend-inner-icon="mdi-magnify"
                                                single-line
                                                outlined
                                                dense
                                                placeholder="搜索热门交流区"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn
                                                dark
                                                color="cyan darken-2"
                                        >
                                            搜索
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>

                            <!-- 热门问题 -->
                            <v-list two-line dense>
                                <template v-for="(item, index) in hotSearch">
                                    <v-list-item :key="item.title">
                                        <template>
                                            <v-list-item-content>
                                                <v-list-item-subtitle
                                                        class="text--primary"
                                                        v-text="item.headline"
                                                ></v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-list-item-action-text v-text="item.hot_rate"></v-list-item-action-text>

                                                <v-icon
                                                        color="yellow darken-3"
                                                >
                                                    mdi-fire
                                                </v-icon>
                                            </v-list-item-action>
                                        </template>
                                    </v-list-item>

                                    <v-divider
                                            v-if="index < hotSearch.length - 1"
                                            :key="index"
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-card>

                        <!-- 下半部分 -->
                        <v-card>
                            <template>
                                <v-card
                                        width="100%"
                                        class="mx-auto"
                                >

                                    <v-app-bar
                                            dark
                                            color="cyan darken-2"
                                            class="mb-1"
                                    >
                                        <v-spacer></v-spacer>

                                        <v-toolbar-title>热门评论区</v-toolbar-title>

                                        <v-spacer></v-spacer>

                                        <v-btn icon>
                                            <v-icon>
                                                mdi-plus
                                            </v-icon>
                                        </v-btn>
                                    </v-app-bar>
                                    <v-row dense>
                                        <v-col
                                                v-for="(item, i) in comments"
                                                :key="i"
                                                cols="12"
                                        >
                                            <v-card flat>
                                                <div class="d-flex flex-no-wrap justify-space-between">
                                                    <div>
                                                        <v-card-text v-text="item.content"></v-card-text>
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


                                                                    <span class="subheading mr-2">{{ item.likes }}</span>
                                                                    <v-btn icon @click="toComment">
                                                                        <v-icon>
                                                                            mdi-message-outline
                                                                        </v-icon>
                                                                    </v-btn>
                                                                    <span class="subheading mr-2">{{ item.discussion }}</span>
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
                                                        v-if="i < comments.length - 1"
                                                        :key="i"
                                                ></v-divider>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </template>
                        </v-card>

                    </v-tab-item>

                    <!-- 我的主界面 -->
                    <v-tab-item value="tabs-3">
                        <v-card flat>
                            <v-card-text></v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>

            </v-card>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "NewHome",
        data () {
            return {
                inputValue: "",
                tabs: "tabs-1",
                like: false,
                hotSearch: [
                    {
                        hot_rate: '12555',
                        headline: '身份证怎么办理',
                    },
                    {
                        hot_rate: '2342',
                        headline: '办理房产证需要到什么地方去',
                    },
                    {
                        hot_rate: '118',
                        headline: '我想买车要办里什么证件吗',
                    },
                ],
                departments: [
                    {
                        description: '18088012342',
                        work_time: '上午8:30-12:00；下午2:30-5:30',
                        dept_id: "",
                        picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723534203,3190979793&fm=26&gp=0.jpg',
                        dept_name: '洪山区市政府',
                        location: '武汉市集贤路特1号华通花园2号楼',
                    },
                    {
                        description: '18088012342',
                        work_time: '上午8:30-12:00；下午2:30-5:30',
                        dept_id: "",
                        picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2873493749,1373290045&fm=26&gp=0.jpg',
                        dept_name: '青山区民政局',
                        location: '武汉市青山区临江大道868号',
                    },
                    {
                        description: '18088012342 15546399342',
                        work_time: '上午8:30-12:00；下午2:30-5:30',
                        dept_id: "",
                        picture: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2537935077,2996162810&fm=26&gp=0.jpg',
                        dept_name: '东湖新技术开发区管委会社会发展局',
                        location: '黄陂区前川街百秀街183号',
                    },
                    {
                        description: '18088012342 15546399342',
                        work_time: '上午8:30-12:00；下午2:30-5:30',
                        dept_id: "",
                        picture: '',
                        dept_name: '洪山区市政府与东湖新技术开发区管委会社会发展局',
                        location: '武汉市集贤路特1号华通花园2号楼',
                    },
                ],

                comments: [
                    {
                        likes: "123",
                        discussion: "33",
                        picture: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00201-399.jpg',
                        content: '到户口所在地的派出所申请领取第二代居民身份证时，应该提前准备好相应的证件，一般只需要准备好户口本就行了，到了派出所后工作人员会根据情况帮忙进行办理。',
                    },
                    {
                        likes: "53",
                        discussion: "5",
                        picture: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00666-2712.jpg',
                        content: '如果到了合适的年龄,是可以去户口所在地的派出所办理身份证的。那么,您知道怎么正确办理身份证吗?到户口所在地的派出所申请领取第二代居民身份证时，应该提前准备好相应的证件，一般只需要准备好户口本就行了，到了派出所后工作人员会根据情况帮忙进行办理。',
                    },
                    {
                        likes: "23",
                        discussion: "13",
                        picture: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00209-639.jpg',
                        content: '到户口所在地的派出所申请领取第二代居民身份证时，应该提前准备好相应的证件，一般只需要准备好户口本就行了，到了派出所后工作人员会根据情况帮忙进行办理。',
                    },
                    {
                        likes: "133",
                        discussion: "32",
                        picture: '',
                        content: '如果到了合适的年龄,是可以去户口所在地的派出所办理身份证的。那么,您知道怎么正确办理身份证吗?到户口所在地的派出所申请领取第二代居民身份证时，应该提前准备好相应的证件，一般只需要准备好户口本就行了，到了派出所后工作人员会根据情况帮忙进行办理。',
                    },
                    {
                        likes: "13",
                        discussion: "3",
                        picture: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3849073968,2338614801&fm=26&gp=0.jpg',
                        content: '如果到了合适的年龄,是可以去户口所在地的派出所办理身份证的。那么,您知道怎么正确办理身份证吗?到户口所在地的派出所申请领取第二代居民身份证时，应该提前准备好相应的证件，一般只需要准备好户口本就行了，到了派出所后工作人员会根据情况帮忙进行办理。',
                    },
                ],
            }
        },

        methods: {
            toComment() {
                this.$router.push({ name: 'comment' });
            },
            toSearchResult() {
                this.$router.push({ name: 'searchResult' });
            },
            toDepartment() {
                this.$router.push({ name: 'process' });
            }
        }
    }
</script>

<style scoped>

    /*input框*/
    #info{
        position: relative;
        left: 5px;
        width: 100%;
        height: 42px;
        border-radius: 10px 0 0 0;
        border: 2px solid #c4c7ce;
        background-color: white;
    }
    #btn1{
        width: 100%;
        height: 42px;
        right: 10px;
        padding: 0;
        border-radius: 0 10px 10px 0;
        font-size: 17px;
        color: #fff;
        font-weight: 400;
        outline: 0;
    }

</style>
