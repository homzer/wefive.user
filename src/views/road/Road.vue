<template>
    <v-container>
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
    export default {
        name: "Road",
        methods: {

            back() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>

</style>
