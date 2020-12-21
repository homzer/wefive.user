<template>
    <v-container onload="loadProcessOfBus()">
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
                <v-stepper-items
                        v-for="(item, i) in processes"
                        :key="i"
                >
                    <v-stepper-step
                            :complete="e6 > i + 1"
                            :step="i + 1"
                            color="cyan darken-2"
                    >
                        {{ item.title }}
                    </v-stepper-step>
                    <v-stepper-content
                            :step="i + 1"
                    >
                        <v-card-subtitle>{{ item.content }}</v-card-subtitle>
                        <v-row dense>
                            <v-col
                                    cols="12"
                                    v-for="(m, index) in item.materials"
                                    :key="index"
                            >
                                <v-card
                                        flat
                                        class="mb-1"
                                        max-width="350"
                                >
                                    <v-card-subtitle v-text="m.material_name"></v-card-subtitle>
                                    <v-card-text v-text="m.description"></v-card-text>
                                    <v-img :src="m.photo_url"></v-img>
                                </v-card>
                                <v-divider class="mt-3" color="black" v-if="index !== item.materials.length - 1"></v-divider>
                            </v-col>
                        </v-row>
                        <v-btn
                                color="cyan darken-2"
                                dark
                                @click="e6 += 1"
                                v-if="e6 !== processes.length"
                        >
                            下一步
                        </v-btn>
                        <v-btn
                                color="cyan darken-2"
                                dark
                                @click="e6 = 1"
                                v-if="e6 === processes.length"
                        >
                            完成
                        </v-btn>
                        <v-btn
                                text
                                @click="e6 = e6 - 1"
                                v-if="e6 !== 1"
                        >
                            返回
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>

            </v-stepper>
        </template>
    </v-container>
</template>

<script>
    import processService from "../../service/processService";

    export default {
        name: "Process",
        data () {
            return {
                e6: 1,
                processes: [{
                    process_id: "",
                    bus_id: "",
                    title: "",
                    content: "",
                    step: "",
                    materials: [{
                        material_id: "",
                        description: "",
                        photo_url: "",
                        bus_id: "",
                        material_name: "",
                    }],
                }],
                /*processes: [
                    {
                        title: "准备相关材料",
                        picture: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00761-2475.jpg",
                        material_name: "结婚证",
                        description: "",
                    },
                    {
                        title: "排队等候",
                        picture: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3467347491,3513291551&fm=26&gp=0.jpg",
                        material_name: "结婚证",
                        description: "",
                    },
                    {
                        title: "到1号柜台办理手续",
                        picture: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3741226544,1067997984&fm=26&gp=0.jpg",
                        material_name: "结婚证",
                        description: "",
                    },
                    {
                        title: "取回相应证件，办理结束",
                        picture: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2727107182,1715079255&fm=26&gp=0.jpg",
                        material_name: "结婚证",
                        description: "",
                    },
                ],*/
                /*materials: [
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
                ],*/
            }
        },
        mounted: function() {
            this.loadProcessOfBus();
        },
        methods: {

            loadProcessOfBus() {
                let busId = this.$route.params.busId;
                processService.getBusProcess(busId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    } else {
                        this.processes = res.data.data.processes;
                    }
                }).catch((err) => {
                    alert(err);
                });
            },

            back() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>

</style>
