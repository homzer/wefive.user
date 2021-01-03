<template>
    <v-container onload="getSearchResult()" >
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>欢迎使用指尖武汉</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
                v-if="!show"
                indeterminate
                height="4"
                color="cyan darken-1"
        ></v-progress-linear>

        <v-container v-if="show">

            <v-card
                    class="pa-4"
                    flat
                    height="200"
                    img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
            >
            </v-card>

            <v-card>
                <template>
                    <v-card
                            class="mx-auto mt-3"
                    >
                        <v-toolbar
                                color="cyan darken-2"
                                dark
                        >
                            <v-toolbar-title>离我最近部门</v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-list two-line>
                            <v-list-item-group
                                    v-model="selected"
                                    active-class="cyan--text"
                            >
                                <template v-for="(item, index) in departments">
                                    <v-list-item :key="item.title" :id="item.deptId" @click="toDepartComment">
                                        <template>
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.deptName"></v-list-item-title>

                                                <v-list-item-subtitle
                                                        class="text--primary"
                                                        v-text="item.location"
                                                ></v-list-item-subtitle>

                                                <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-list-item-action-text>
                                                    <v-chip
                                                            text-color="white"
                                                            color="cyan darken-2"
                                                    >
                                                        <v-icon
                                                                left
                                                        >
                                                            mdi-clock-outline
                                                        </v-icon>
                                                        {{item.mintime}}
                                                    </v-chip>
                                                </v-list-item-action-text>
                                            </v-list-item-action>
                                        </template>
                                    </v-list-item>

                                    <v-divider
                                            v-if="index < departments.length - 1"
                                            :key="index"
                                    ></v-divider>
                                </template>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </template>

                <v-divider></v-divider>
                <!--<template>
                    <v-card
                            class="mx-auto mt-3"
                            flat
                    >
                        <v-toolbar>
                            <v-toolbar-title>业务匹配结果</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-list two-line>
                            <v-list-item-group
                                    active-class="cyan&#45;&#45;text"
                            >
                                <template v-for="(item, index) in businesses">
                                    <v-list-item :key="item.bus_name" :id="item.bus_id" @click="toDepartComment">
                                        <template>
                                            <v-list-item-content>
                                                <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>

                                    <v-divider
                                            v-if="index < businesses.length - 1"
                                            :key="index"
                                    ></v-divider>
                                </template>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </template>-->
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
    import searchService from "../../service/searchService";
    import businessService from "../../service/businessService";

    export default {
        name: "SearchResult",
        data: () => ({
            selected: [2],
            active: false,
            show: false,
            departments: [
                {
                    contact: '',
                    deptId: '',
                    deptName: '',
                    description: '',
                    latitude: '',
                    location: '',
                    mintime: '',
                    picture: '',
                    workTime: '',
                },
            ],

            businesses: [{
                bus_id: '',
                dept_id: '',
                bus_name:'',
                description: '',
                requirement: '',
                cost: '',
            }],
        }),
        mounted: function() {
            this.getSearchResult();
        },
        methods: {
            getSearchResult() {
                let info = this.$route.params.info;
                console.log(info);

                let userId = this.$store.state.userModule.userInfo.userId;
                let createTime = "2020-12-08";
                searchService.getSearchInfo(info, userId, createTime).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    this.departments = res.data.departments;
                    if (!this.departments) {
                        alert("未查找到相关部门！");
                        this.$router.go(-1);
                    }
                    console.log(res.data);
                    this.show = true;
                    return businessService.getBusiness(this.departments[0].deptId.toString());
                }).then((res) =>{
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                        return null;
                    }
                    this.businesses = res.data.data.businesses;
                }).catch((err) => {
                    alert(err);
                });


            },
            toDepartComment(event) {
                let deptId = event.currentTarget.id;
                this.$router.push({ name: 'comment', params: {"deptId": deptId} });
            },
            back() {
                this.$router.push({ name: 'home', params: {'tab': "tabs-1"} });
            },
        }
    }
</script>

<style scoped>
#map{
    width: 100%;
    height: 100%;
}
</style>
