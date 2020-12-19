<template>
    <v-container>
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>业务办理流程</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

        <template>
            <v-stepper
                    v-model="e6"
                    vertical
            >
                <v-stepper-step
                        :complete="e6 > 1"
                        step="1"
                        color="cyan darken-2"
                >
                    准备一寸照片
                    <small>此项为必备材料</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-card
                            color="grey lighten-1"
                            class="mb-12"
                            max-width="400"
                    ><v-img :src="materials[e6-1].photo_url"></v-img></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 2"
                    >
                        下一步
                    </v-btn>
                </v-stepper-content>

                <v-stepper-step
                        :complete="e6 > 2"
                        step="2"
                        color="cyan darken-2"
                >
                    排队取票等候
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-card
                            color="grey lighten-1"
                            class="mb-12"
                            height="200px"
                    ><v-img :src="materials[e6-1].photo_url"></v-img></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 3"
                    >
                        下一步
                    </v-btn>
                    <v-btn text @click="e6 = e6 - 1">
                        返回
                    </v-btn>
                </v-stepper-content>

                <v-stepper-step
                        :complete="e6 > 3"
                        step="3"
                        color="cyan darken-2"
                >
                    到1号台进行手续办理
                </v-stepper-step>
                <v-stepper-content step="3">
                    <v-card
                            color="grey lighten-1"
                            class="mb-12"
                            max-width="400"
                    ><v-img :src="materials[e6-1].photo_url"></v-img></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 4"
                    >
                        下一步
                    </v-btn>
                    <v-btn text @click="e6 = e6 - 1">
                        返回
                    </v-btn>
                </v-stepper-content>

                <v-stepper-step
                        step="4"
                        color="cyan darken-2"
                >
                    取回相应证件，办理结束
                </v-stepper-step>
                <v-stepper-content step="4">
                    <v-card
                            color="grey lighten-1"
                            class="mb-12"
                            max-width="400"
                    ><v-img :src="materials[e6-1].photo_url"></v-img></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 1"
                    >
                        完成
                    </v-btn>
                    <v-btn text @click="e6 = e6 - 1">
                        返回
                    </v-btn>
                </v-stepper-content>

            </v-stepper>
        </template>
    </v-container>
</template>

<script>
    export default {
        name: "Process",
        data () {
            return {
                e6: 1,
                materials: [
                    {
                        material_id: '',
                        photo_url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00761-2475.jpg',
                    },
                    {
                        material_id: '',
                        photo_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3467347491,3513291551&fm=26&gp=0.jpg',
                    },
                    {
                        material_id: '',
                        photo_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3741226544,1067997984&fm=26&gp=0.jpg',
                    },
                    {
                        material_id: '',
                        photo_url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2727107182,1715079255&fm=26&gp=0.jpg',
                    },
                ],
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>

</style>
