<template>
    <v-container>
        <v-row justify="center">
            <v-card max-width="90%" max-height="80%" class="mt-5">
                <v-card-text class="text--primary text-center">
                    <h1 style="font-family: 楷体,serif; margin-top: 20px;" >指尖武汉</h1>
                    <h3 style="font-family: 楷体,serif">指尖办理，方便你我</h3>
                </v-card-text>
                <v-img
                        class="white--text align-end"
                        height="150px"
                        width="90%"
                        style="margin: auto;"
                        color="darkgray"
                        src="https://i.loli.net/2020/12/06/i6DmWUEg15IBkn8.jpg"
                >
                </v-img>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue"
                            class="py-5 pr-13 pl-13 mt-8"
                            id="SignInBtn"
                            dark
                            style="position: relative; bottom: 10px; height: 30px;"
                            @click="thirdPartyAuth()"
                            width="60%"
                    >
                        登录
                    </v-btn>

                    <v-spacer></v-spacer>
                </v-card-actions>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue"
                            class="py-5 pr-13 pl-13 my-8"
                            id="signUpBtn"
                            dark
                            width="60%"
                            style="position: relative; bottom: 10px; height: 30px"
                            @click="thirdPartyAuth1()"
                    >
                        注册
                    </v-btn>

                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-row>


        <v-img

                class="white&#45;&#45;text align-end"
                height="40px"
                width="95px"
                style="margin: auto; margin-top: 30px"
                color="darkgray"
                src="https://i.loli.net/2020/12/07/gTK2BV6y1JtoeOX.png"
        >
        </v-img>
      <div class="wrapper">
        <div class="footer" align="center" style="font-family: 'Ink Free';font-size: small">From：WeFive</div>
      </div>

    </v-container>
</template>

<script>
    export default {
        name: "Init",
        methods: {
            thirdPartyAuth() {
              this.$router.push({ name: 'signIn' });
            },

            thirdPartyAuth1(){
              this.$router.push({ name: 'signUp' });
            },
        },
    };
</script>

<style scoped>
</style>
