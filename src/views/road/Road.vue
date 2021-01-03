<template>
    <v-container onload="loadRoad()">
        <v-toolbar flat color="cyan darken-2" dark>
            <v-btn icon @click="back">
                <v-icon>mdi-reply</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>路线详情</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-container>
</template>

<script>
    import roadService from "../../service/roadService";

    export default {
        name: "Road",
        data() {
            return {
                cost: 0,
                打车花费: 0,
            }
        },
        mounted: function() {
            this.loadRoad();
        },
        methods: {
            loadRoad() {
                let deptId = this.$route.params.deptId;
                roadService.getRoad(deptId).then((res) => {
                    if (res.data.code !== 200) {
                        alert(res.data.msg);
                    }
                    console.log(res.data);
                    this.cost = res.data.打车花费;
                    alert(this.code);
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
