<template>
    <v-container onload="loadInfo()">
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
                <v-card flat color="cyan darken-2">
                    <v-img
                            class="white--text align-end"
                            height="280px"
                            width="100%"
                            min-width="300"
                            color="darkgray"
                    >
                        <v-carousel
                                style="top: 70px"
                                cycle
                                height="300"
                                :show-arrows="false"
                                hide-delimiter-background
                                hide-delimiters
                        >
                            <v-carousel-item :src="'http://5b0988e595225.cdn.sohucs.com/images/20180607/b9e8dd1a30df4d6ab7929af7b54af725.jpeg'">
                            </v-carousel-item>
                            <v-carousel-item
                                    :src="'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2313524264,2445894105&fm=26&gp=0.jpg'"
                            >
                            </v-carousel-item>
                            <v-carousel-item
                                    :src="'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1270512280,2500363722&fm=26&gp=0.jpg'"
                            >
                            </v-carousel-item>

                        </v-carousel>
                        <v-row justify="center">
                            <v-spacer></v-spacer>
                            <!-- 输入框 -->
                            <v-col cols="8">
                                <v-autocomplete
                                        color="cyan darken-2"
                                        background-color="white"
                                        :items="searchList"
                                        hide-details
                                        prepend-inner-icon="mdi-magnify"
                                        single-line
                                        label="搜索部门或业务"
                                        outlined
                                        dense
                                        id="info"
                                        :filter="customFilter"
                                ></v-autocomplete>
                                <!--<label for="info"></label>
                                <input
                                        v-model="inputValue"
                                        autofocus="autofocus"
                                        autocomplete="off"
                                        placeholder="搜索业务和部门"
                                        class="new-todo ml-3"
                                        id="info"
                                />-->
                            </v-col>
                            <!-- 搜索按钮 -->
                            <v-col cols="3">
                                <v-btn id="btn1" color="cyan darken-2" @click="toSearchResult">
                                    搜索
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

                                <v-toolbar-title>热搜部门和业务</v-toolbar-title>

                                <v-spacer></v-spacer>
                                <v-btn
                                        color="white"
                                        dark
                                        text
                                        fab
                                        absolute
                                        right
                                >
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </v-app-bar>

                            <v-row dense>
                                <v-col
                                        v-for="(item, i) in businesses"
                                        :key="i"
                                        cols="12"
                                >
                                    <v-card flat :id="item.dept_id">
                                        <div class="d-flex flex-no-wrap justify-space-between">
                                            <div>
                                                <v-card-title
                                                        v-text="item.dept_name + '(' + item.bus_name + ')'"
                                                ></v-card-title>
                                                <v-card-subtitle v-text="item.location"></v-card-subtitle>

                                                <v-card-text>
                                                    <div v-text="item.description"></div>
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

                                        <v-card-actions>
                                            <v-btn
                                                    icon
                                                    @click=" showDetail === i ? showDetail = -1 : showDetail = i "
                                            >
                                                <v-icon>{{ showDetail === i ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                    color="cyan darken-2"
                                                    @click="toBusProcess"
                                                    large
                                                    dark
                                                    width="180"
                                                    :id="item.bus_id"
                                            >
                                                办理详情
                                            </v-btn>
                                        </v-card-actions>
                                        <v-expand-transition>
                                            <div v-show="showDetail === i">
                                                <v-chip outlined class="ma-1"><v-icon>mdi-clock</v-icon>{{item.work_time}}</v-chip>
                                                <v-chip outlined class="ma-1"><v-icon>mdi-phone</v-icon>{{item.phone}}</v-chip>
                                            </div>
                                        </v-expand-transition>
                                    </v-card>
                                    <v-divider
                                            v-if="i < businesses.length - 1"
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
                <v-card>
                    <!-- 筛选热门问题 -->
                    <v-card-actions>
                        <v-row class="mt-5">
                            <v-col cols="9">
                                <v-autocomplete
                                        color="cyan darken-2"
                                        :items="titles"
                                        hide-details
                                        prepend-inner-icon="mdi-magnify"
                                        single-line
                                        outlined
                                        dense
                                        value=""
                                        id="chatFilter"
                                        placeholder="搜索热门交流区"
                                        :filter="customFilter"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="2">
                                <v-btn
                                        dark
                                        color="cyan darken-2"
                                        @click="toChatFiltered"
                                >
                                    搜索
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                    <!-- 热门问题 -->
                    <v-list two-line dense>
                        <template v-for="(item, index) in hotSearch">
                            <v-list-item :key="item.title" >
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

                                <v-btn icon @click="toNewChat">
                                    <v-icon>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-app-bar>
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
                                                            <v-icon>
                                                                mdi-message-outline
                                                            </v-icon>
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

            </v-tab-item>

            <!-- 我的主界面 -->
            <v-tab-item value="tabs-3">
                <v-card>
                    <template>
                        <div v-if="flag === 1">
                            <div class="usercenter">
                                <div class="user-style">
                                    <div class="userimg-style" >
                                        <img v-bind:src="'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=201340457,3408503524&fm=26&gp=0.jpg'"/>
                                    </div>
                                    <div class="username-plus">
                                        <span>{{user.name1}}</span>
                                    </div>
                                    <div class="btn-update">
                                        <span v-on:click="flag = 2">修改</span>
                                    </div>
                                </div>

                                <template>
                                    <v-container fluid>
                                        <v-row>

                                            <v-col
                                                    :cols="12"
                                            >
                                                <v-card>
                                                    <v-img
                                                            :src="'https://i.loli.net/2020/12/20/iZsuaYNU4cJd8C5.png'"
                                                            class="white--text align-end"
                                                            height="200px"
                                                    >
                                                    </v-img>
                                                </v-card>
                                            </v-col>

                                            <v-col
                                                    :cols="12"
                                            >
                                                <v-card class="card">
                                                            <span class="tit">
                                                                我的信息
                                                            </span>
                                                    <v-btn style="background-image: url('https://i.loli.net/2020/12/20/6CtLiIsGcjWkVgh.png');
                          height: 45px; float: right; width: 10px"
                                                           @click="showInformation">
                                                    </v-btn>
                                                </v-card>
                                            </v-col>


                                            <div class="mymess" v-show="flag2">
                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                &nbsp;&nbsp;电话<span>{{user.tel1}}</span>
                                            </div>
                                            <div class="mymess" v-show="flag2">
                                                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                                &nbsp;&nbsp;身份证<span id="ID">{{user.cardId1}}</span>
                                            </div>


                                            <v-col
                                                    :cols="12"
                                            >
                                                <v-card class="card">
                                                            <span class="tit">
                                                                我的预约
                                                            </span>
                                                    <v-btn style="background-image: url('https://i.loli.net/2020/12/20/6CtLiIsGcjWkVgh.png');
                          height: 45px; float: right; width: 10px"
                                                           @click="showReserve === true ? showReserve = false : showReserve
                                                                   = true"
                                                    >
                                                    </v-btn>
                                                </v-card>
                                            </v-col>
                                            <!--这里写预约信息-->
                                            <div class="mymess" v-show="showReserve" v-for="(item,i) in
                                                    myOrder" :key="i">
                                                &nbsp;&nbsp;{{item.deptName}}  {{item.order_day}}
                                                {{item.order_time}}
                                                <v-btn
                                                        color="cyan darken-2"
                                                        :id="item.dept_id"
                                                        @click="cancelReserve"
                                                        dark
                                                        width="40"
                                                        height="25"
                                                        style="float: right"
                                                >
                                                    取消
                                                </v-btn>
                                            </div>


                                            <v-col
                                                    :cols="12"
                                            >
                                                <v-card class="card">
                  <span class="tit">
                    关于我们
                  </span>
                                                    <v-btn style="background-image: url('https://i.loli.net/2020/12/20/6CtLiIsGcjWkVgh.png');
                          height: 45px; float: right; width: 10px"
                                                    >
                                                    </v-btn>
                                                </v-card>
                                            </v-col>

                                        </v-row>
                                    </v-container>
                                </template>
                            </div>
                        </div>


                        <div v-else-if="flag === 2" class="form">
                            <div class="usercenter">
                                <div class="user-style">
                                    <div class="userimg-style"><img v-bind:src="'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=201340457,3408503524&fm=26&gp=0.jpg' + user.icon"/></div>
                                    <div class="username-plus"><span>{{user.name1}}</span></div>
                                    <div class="btn-update"><span v-on:click="flag = 1">取消</span></div>
                                </div>
                            </div>
                            <div class="input-control" style="margin-top:50px">
                                <input id="name" type="text" name="username" v-model="user.name1" placeholder="昵称"/>
                            </div>
                            <div class="input-control">
                                <input id="password" type="text" name="username" v-model="user.password1" placeholder="请输入新的密码" />
                            </div>
                            <div class="input-control">
                                <input id="phone" type="text" name="username" v-model="user.tel1" placeholder="电话" />
                            </div>
                            <div class="input-control">
                                <input id="cardId" type="text" name="username" v-model="user.cardId1" placeholder="身份证号" />
                            </div>
                            <div class="button-control">
                                <input type="button" name="submit" value="提交" v-on:click="submit"/>
                            </div>



                        </div>

                    </template>
                </v-card>
            </v-tab-item>

        </v-tabs-items>
        <v-snackbar
                v-model="isEmpty"
                :timeout="2000"
                absolute
                top
                left
        >
            您的输入为空！
        </v-snackbar>
    </v-container>
</template>

<script>
    import businessService from "../../service/businessService";
    import myInformationService from "../../service/myInformationService";
    import chatService from "../../service/chatService";
    import reserveService from "../../service/reserveService";

    export default {
        name: "NewHome",
        data () {
            return {
                isActive: false,
                tabs: "tabs-1",
                /* 搜索主页 */
                inputValue: "",
                showDetail: false,
                isEmpty: false,
                searchList: [],
                busList: [],
                deptList: [],

                businesses: [
                    {
                        phone: '18088012342',
                        work_time: '上午8:30-12:00；下午2:30-5:30',
                        dept_id: "",
                        picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723534203,3190979793&fm=26&gp=0.jpg',
                        dept_name: '洪山区市政府',
                        location: '武汉市集贤路特1号华通花园2号楼',

                        bus_id: '',
                        bus_name: '办理身份证',
                        description: '年满16周岁的中国公民,应当向常住户口所在地的户口登记机关履行申领居民身份证手续。',
                        cost: '20',
                    },
                    {
                        phone: '18088012342',
                        work_time: '上午8:30-12:00；下午2:30-5:30',
                        dept_id: "",
                        picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723534203,3190979793&fm=26&gp=0.jpg',
                        dept_name: '洪山区市政府',
                        location: '武汉市集贤路特1号华通花园2号楼',

                        bus_id: '',
                        bus_name: '办理身份证',
                        description: '年满16周岁的中国公民,应当向常住户口所在地的户口登记机关履行申领居民身份证手续。',
                        cost: '20',
                    },
                    {
                        phone: '18088012342',
                        work_time: '上午8:30-12:00；下午2:30-5:30',
                        dept_id: "",
                        picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723534203,3190979793&fm=26&gp=0.jpg',
                        dept_name: '洪山区市政府',
                        location: '武汉市集贤路特1号华通花园2号楼',

                        bus_id: '',
                        bus_name: '办理身份证',
                        description: '年满16周岁的中国公民,应当向常住户口所在地的户口登记机关履行申领居民身份证手续。',
                        cost: '20',
                    },
                ],

                /* 评论交流 */
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
                titles: [],
                chats: [{
                    chat_id: '',
                    content: '',
                    discussions: '',
                    likes: '',
                    picture: '',
                    title: '',
                }],

                /* 我的信息 */
                flag: 1,
                flag2:false,
                myOrder: [{
                    dept_id:'',
                    order_time:'',
                    order_day:'',
                    deptName:'',
                    order_id: '',
                    user_id: '',
                }],

                showReserve: false,
                user: {
                    name1: '',
                    password1: '',
                    tel1: '',
                    cardId1: ''
                },
                users: {
                    name1: '',
                    password1: '',
                    tel1: '',
                    cardId1: ''
                },
            }
        },
        mounted: function() {
            this.getInformation();
            this.loadInfo();
            this.getReservation();
        },
        methods: {

            loadInfo() {
                this.tabs = this.$route.params.tab;
                // 获取热门业务
                businessService.getHotBusiness().then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.businesses = res.data.data.businesses;
                        this.busList = new Array(this.businesses.length);
                        this.deptList = new Array(this.businesses.length);
                        this.searchList = new Array(this.businesses.length*2 + 2);
                        let j = 0;
                        for (let i = 0; i < this.businesses.length; i++) {
                            this.busList[i] = this.businesses[i].bus_name;
                            this.deptList[i] = this.businesses[i].dept_name;
                            this.searchList[j++] = this.deptList[i];
                            this.searchList[j++] = this.busList[i];
                        }
                        this.searchList[j++] = "民政局";
                        this.searchList[j] = "公安局";
                        /*this.searchList = new Array(this.busList.length + this.deptList.length);
                        for (let i = 0; i < this.busList.length; i++) {
                            this.searchList.concat(this.busList[i]);
                            this.searchList.add(this.deptList[i]);
                        }*/
                    }
                }).catch((err) => {
                    alert(err);
                });

                // 获取评论
                chatService.getHotChats().then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.chats = res.data.data.chats;
                        this.titles = new Array(this.chats.length);
                        for (let i = 0; i < this.chats.length; i++) {
                            this.titles[i] = this.chats[i].title;
                        }
                    }
                }).catch((err) => {
                    alert(err);
                });

            },

            /* 搜索 */
            toSearchResult() {
                /*if (this.searchList.length === 0) return null;
                let info = this.searchList[0];*/
                let info = document.getElementById("info").value;
                if (!info || info.length === 0) {
                    this.isEmpty = true;
                    return null;
                }
                this.$router.push({ name: 'searchResult' , params: {'info': info}});
            },
            toBusProcess(event) {
                let busId = event.currentTarget.id;
                this.$router.push({ name: 'process' , params: {'busId': busId}});
            },

            /* 聊天交流 */
            toNewChat() {
                this.$router.push({ name: "newChat" });
            },
            toChatFiltered() {
                let title = document.getElementById("chatFilter").value;
                if (title.length === 0) return null;
                this.$router.push({ name: "chatFiltered", params: {"title": title} });
            },
            toChat(event) {
                let chatId = event.currentTarget.id;
                this.$router.push({ name: 'chat', params: {'chatId': chatId} });
            },
            customFilter (item, queryText) {
                return item.indexOf(queryText) > -1
            },

            /* 我的信息 */
            submit:function () {
                let phone = document.getElementById("phone").value;
                let password = document.getElementById("password").value;
                let name = document.getElementById("name").value;
                let cardId = document.getElementById("cardId").value;
                if(password===""){
                    alert("密码不能为空！");
                    return;
                }
                let that = this;
                myInformationService.sendMyInformation(that.$store.state.userModule.userInfo.userId,name,
                    phone,cardId,password).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    that.user.name1 = name;
                    that.user.tel1 = phone;
                    that.user.password1 = password;
                    that.user.cardId1 = cardId;
                    that.flag = 1;
                    alert("修改成功！")
                }).catch((err) => {
                    alert(err);
                })
            },
            getInformation:function () {
                let that = this;
                myInformationService.getMyInformation(this.$store.state.userModule.userInfo.userId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    that.user.name1 = res.data.users.name;
                    that.user.tel1 = res.data.users.phone;
                    that.user.password1 = "";
                    that.user.cardId1 = res.data.users.cardId;

                    console.log(this.user);
                }).catch((err) => {
                    alert(err);
                })
            },

            getReservation(){
                let that = this;
                reserveService.checkReservation(that.$store.state.userModule.userInfo.userId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    this.myOrder = res.data.myorder;
                    for (let i = 0; i < this.myOrder.length; i++) {
                        if (this.myOrder[i].order_time === 1) {
                            this.myOrder[i].order_time = "8:30-12:00";
                        } else {
                            this.myOrder[i].order_time = "14:30-17:00";
                        }
                    }
                }).catch((err) => {
                    alert(err);
                })
            },
            //取消预约
            cancelReserve(event){
                let that = this;
                let deptId = event.currentTarget.id;
                reserveService.cancelReservation(that.$store.state.userModule.userInfo.userId,deptId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    alert("取消成功");
                    location.reload();
                }).catch((err) => {
                    alert(err);
                })

            },
            showInformation(){
                this.flag2 = !this.flag2;
            }
        }
    }
</script>

<style scoped>
    @import '../../../static/css/mymess.css'; /*input框*/

    #info{
        caret-color: black;
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

    .mymess{
        margin-top: 10px;
        margin-left: 18px;
    }

    .card{
        margin-top: 20px;
        height: 45px;
        font-size: 25px;
        background-color: white;
    }

</style>
