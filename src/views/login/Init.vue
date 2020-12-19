<template >
    <div class="background">
        <v-card-text class="text--primary">
            <h1 align="center" style="font-family: 楷体; margin-top: 100px;" >指尖武汉</h1>
            <h3 align="center" style="font-family: 楷体">指尖办理，方便你我</h3>
        </v-card-text>
        <v-img
                class="white--text align-end"
                height="150px"
                width="300px"
                style="margin: auto;"
                color="darkgray"
                src="https://i.loli.net/2020/12/06/i6DmWUEg15IBkn8.jpg"
        >
        </v-img>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="cyan darken-2"
                    class="py-5 pr-13 pl-13 mt-8"
                    id="SignInBtn"
                    style="position: relative; bottom: -15px; height: 50px;"
                    @click="thirdPartyAuth()"
                    dark
                    width="300"
                    max-width="300"
            >
                登录
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="cyan darken-2"
                    id="signUpBtn"
                    style="position: relative; top: 25px; height: 50px"
                    @click="thirdPartyAuth1()"
                    dark
                    width="300"
                    max-width="300"
            >
                注册
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>

        <v-img

                class="white&#45;&#45;text align-end"
                height="40px"
                width="95px"
                style="margin: auto; margin-top: 233px"
                color="darkgray"
                src="https://i.loli.net/2020/12/07/gTK2BV6y1JtoeOX.png"
        >
        </v-img>


        <div class="footer" align="center" style="font-family: 'Ink Free';font-size: small">From
            ：WeFive</div>


    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            thirdPartyAuth() {
                this.$router.push({ name: 'SignIn' });
            },

            thirdPartyAuth1(){
                this.$router.push({ name: 'SignUp' });
            },
        },
    };
</script>

<style scoped>
    button{
        width: 100px;
        height: 25px;
        color: white;
        border: 0;
        border-radius: 20px;
    }

    .background{
        background-image: url("https://i.loli.net/2020/12/19/ZHDdQ8Ca1eLoqwv.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        float: bottom;
    }
</style>
