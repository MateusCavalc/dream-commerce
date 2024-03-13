<template>
    <div
        class="container w-fit mx-auto p-4 mt-12 bg-[rgb(248,249,250)] flex flex-col items-center justify-center text-[#212529] rounded-xl shadow-md">
        <router-link to="/">
            <div class="logo flex-2 p-4 text-5xl mb-4">
                <strong class="text-[#495057] text-7xl">Dream</strong>Commerce
            </div>
        </router-link>
        <Loading v-if="validatingToken" class="my-16" />
        <main v-else class="w-full flex flex-col items-center justify-center">
            <div class="w-10/12 sm:w-8/12 mb-4">
                <h1 class="text-4xl font-semibold">{{ isSignIn ? "Welcome back." : "Welcome." }}</h1>
            </div>
            <div class="w-10/12 sm:w-8/12 mb-6">
                <div v-if="errorMsg != null" class="text-white bg-[#f44336] mb-3 p-2 rounded">
                    <span>{{ errorMsg }}</span>
                </div>

                <input
                    class="mb-4 p-2 appearance-none block w-full bg-[#E9ECEF] placeholder-[#343A40] rounded border outline-none"
                    v-if="!isSignIn" type="text" v-model="user.name" placeholder="Name" />
                <input
                    class="mb-4 p-2 appearance-none block w-full bg-[#E9ECEF] placeholder-[#343A40] rounded border outline-none"
                    type="text" v-model="user.email" placeholder="Email" />
                <input
                    class="mb-4 p-2 appearance-none block w-full bg-[#E9ECEF] placeholder-[#343A40] rounded border outline-none"
                    type="password" v-model="user.password" placeholder="Password" />
                <input
                    class="mb-4 p-2 appearance-none block w-full bg-[#E9ECEF] placeholder-[#343A40] rounded border outline-none"
                    v-if="!isSignIn" type="password" v-model="user.passwordConfirmation"
                    placeholder="Confirm Password" />

                <div class="flex items-center">
                    <a class="ml-4 cursor-pointer hover:underline" @click.prevent="isSignIn = !isSignIn">
                        <span v-if="isSignIn">Register</span>
                        <span v-else>Sign In</span>
                    </a>
                    <button class="ml-auto w-2/5 bg-[#343A40] text-white p-2 rounded font-semibold hover:bg-[#212529]"
                        type="submit" v-if="isSignIn" @click="signIn">Log In</button>
                    <button class="ml-auto w-2/5 bg-[#343A40] text-white p-2 rounded font-semibold hover:bg-[#212529]"
                        type="submit" v-else @click="signUp">Sign Up</button>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import axios from "axios";

import Loading from '@/components/template/LoadingValidation.vue'

const baseApiUrl = process.env.VUE_APP_API_URL;
const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

export default {
    name: "signIn",
    data() {
        return {
            validatingToken: false,
            isSignIn: true,
            user: {},
            errorMsg: null
        }
    },
    components: { Loading },
    methods: {
        signIn() {
            axios
                .post(`${baseApiUrl}/signin`, this.user)
                .then((resp) => {
                    console.log('feito')
                    const user = {
                        ...resp.data.data.payload,
                        token: resp.data.data.token,
                    };
                    // chama a funcao da store para setar o usuario da sessao
                    this.$store.commit("setUser", user);
                    // salvar o usuario no localStorage para guardar a sessao no browser
                    localStorage.setItem(userKey, JSON.stringify(user));

                    // push route to last path
                    const lastPath = this.$router.options.history.state.back
                    this.$router.push(lastPath ?? '/')
                })
                .catch((err) =>
                    this.errorMsg = err.response.data.msg ?? "Não foi possível realizar o login, tente novamente."
                );
        },
        signUp() {
            axios
                .post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    // toast.success(
                    //     `${resp.data.msg.length
                    //         ? resp.data.msg
                    //         : "Usuário criado com sucesso"
                    //     }`
                    // );
                    this.user = {};
                    this.isSignIn = true;
                })
                .catch((err) =>
                    // toast.error(
                    //     `${err.response.data.msg ?? "Não foi possível criar o usuário, tente novamente"
                    //     }`
                    // )
                    console.log(`${err.response.data.msg ?? "Não foi possível realizar o cadastro, tente novamente."}`)
                );
        }
    },
    async created() {
        // try to get user um localStorage
        const storageUser = JSON.parse(localStorage.getItem(userKey));

        // if any localStorage user
        if (storageUser) {

            this.validatingToken = true

            try {

                await axios.post(`${baseApiUrl}/token/validate`, { token: storageUser.token })
                // user session is a valid!
                // set the storage user
                this.$store.commit("setUser", storageUser)

                // push route to '/'
                this.$router.push('/')

            } catch (err) {
                // remove if user in localStorage but with invalid/expired token
                localStorage.removeItem(userKey);
            }

            this.validatingToken = false

        }

    }
}
</script>
<style></style>