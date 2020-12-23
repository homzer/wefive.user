<template>
    <v-container>
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>欢迎使用指尖武汉</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card
                class="pa-4"
                flat
                height="200"
                img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
        >
            <v-toolbar
                    dense
                    floating
            >
                <v-text-field
                        hide-details
                        prepend-icon="mdi-magnify"
                        single-line
                ></v-text-field>

                <v-btn icon>
                    <v-icon>mdi-crosshairs-gps</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>

        <v-card>
            <template>
                <v-card
                        class="mx-auto mt-3"
                        max-width="500"
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
                            <template v-for="(item, index) in items">
                                <v-list-item :key="item.title" @click="toDepartComment">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.title"></v-list-item-title>

                                            <v-list-item-subtitle
                                                    class="text--primary"
                                                    v-text="item.headline"
                                            ></v-list-item-subtitle>

                                            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                                            <v-icon
                                                    v-if="!active"
                                                    color="grey lighten-1"
                                            >
                                                mdi-star-outline
                                            </v-icon>

                                            <v-icon
                                                    v-else
                                                    color="yellow darken-3"
                                            >
                                                mdi-star
                                            </v-icon>

                                            <v-list-item-action-text v-text="item.rate"></v-list-item-action-text>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider
                                        v-if="index < items.length - 1"
                                        :key="index"
                                ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </template>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "SearchResult",
        data: () => ({
            selected: [2],
            active: false,
            items: [
                {
                    action: '15 min',
                    headline: '洪山区珞南街道44-5号',
                    subtitle: `处理交通事故纠纷，办理驾驶证`,
                    title: '洪山区公安局',
                    rate: '5.0星级',
                },
                {
                    action: '2 hr',
                    headline: '洪山区珞南街道44-5号',
                    subtitle: `test`,
                    title: '街道口公安局',
                    rate: '5.0星级',
                },
                {
                    action: '6 hr',
                    headline: '洪山区珞南街道44-5号',
                    subtitle: '处理交通事故纠纷，办理驾驶证',
                    title: '汉阳民证局',
                    rate: '4.5星级',
                },
                {
                    action: '12 hr',
                    headline: '洪山区珞南街道44-5号',
                    subtitle: '处理交通事故纠纷，办理驾驶证',
                    title: '马房山车管所',
                    rate: '4.0星级',
                },
            ],
        }),
        methods: {
            toDepartComment() {
                this.$router.push({ name: 'comment', params: {"deptId": "1"} })
            },
            back() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>

</style>
