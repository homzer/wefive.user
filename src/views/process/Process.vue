<template>
    <v-container>
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon>
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
                    <small>Summarize if needed</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-card
                            color="grey lighten-1"
                            class="mb-12"
                            height="200px"
                    ></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 2"
                    >
                        下一步
                    </v-btn>
                    <v-btn text>
                        Cancel
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
                    ></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 3"
                    >
                        下一步
                    </v-btn>
                    <v-btn text>
                        Cancel
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
                            height="200px"
                    ></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 4"
                    >
                        Continue
                    </v-btn>
                    <v-btn text>
                        Cancel
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
                            height="200px"
                    ></v-card>
                    <v-btn
                            color="cyan darken-2"
                            dark
                            @click="e6 = 1"
                    >
                        下一步
                    </v-btn>
                    <v-btn text>
                        Cancel
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
            }
        },
    }
</script>

<style scoped>

</style>
