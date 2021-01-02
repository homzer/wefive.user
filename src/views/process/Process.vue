<template>
    <v-container onload="loadProcessOfBus()">
        <v-row justify="center">
            <v-card max-width="500">
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
                        <v-card
                                class="mt-3"
                                flat
                        >
                            <v-card-text>
                                有没有帮助到您？请在下面打上您认为合适的分数，根据您的反馈我们会完善得更好！
                                <div class="text-center mt-1">
                                    <v-rating
                                            v-model="rating"
                                            color="yellow darken-3"
                                            background-color="grey darken-1"
                                            half-increments
                                    ></v-rating>
                                </div>
                            </v-card-text>
                            <v-card-actions class="justify-space-between">
                                <v-btn
                                        color="cyan darken-2"
                                        text
                                        @click="snackbar = true"
                                >
                                    提价评价
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-snackbar
                                v-model="snackbar"
                                :timeout="2000"
                                outlined
                                color="success"
                                bottom
                        ><v-icon color="success">
                            mdi-checkbox-marked-circle
                        </v-icon>
                            感谢您的反馈！
                        </v-snackbar>
                    </v-stepper>

                </template>
            </v-card>
        </v-row>


    </v-container>
</template>

<script>
    import processService from "../../service/processService";

    export default {
        name: "Process",
        data () {
            return {
                e6: 1,
                rating: 4.5,
                snackbar: false,
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

            ratingProcess() {

            },

            back() {
                this.$router.push({ name: 'home', params: {'tab': "tabs-1"} });
            },
        },
    }
</script>

<style scoped>

</style>
