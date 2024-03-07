<template>
    <main
        class="container w-fit mx-auto p-4 mt-12 bg-[#F8F9FA] flex flex-col items-center justify-center text-[#212529] rounded-xl shadow-md">
        <div class="logo flex-2 p-4 text-5xl mb-4">
            <strong class="text-[#495057] text-7xl">Dream</strong>Commerce
        </div>
        <div class="w-10/12 sm:w-8/12 mb-4">
            <h1 class="text-4xl font-semibold">{{ isSignIn ? "Welcome back." : "Welcome." }}</h1>
        </div>
        <div class="w-10/12 sm:w-8/12 mb-6">
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
                v-if="!isSignIn" type="password" v-model="user.passwordConfirmation" placeholder="Confirm Password" />
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
</template>
<script>
import axios from "axios";

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
    name: "signIn",
    data() {
        return {
            isSignIn: true,
            user: {}
        }
    },
    methods: {
        signIn() {
            axios
                .post(`${baseApiUrl}/signin`, this.user)
                .then((resp) => {
                    const user = {
                        ...resp.data.data.payload,
                        token: resp.data.data.token,
                    };
                    // chama a funcao da store para setar o usuario da sessao
                    this.$store.commit("setUser", user);
                    // // salvar o usuario no localStorage para guardar a sessao no browser
                    // localStorage.setItem(userKey, JSON.stringify(user));
                    // toast.success("Login efetuado com sucesso");

                    this.$router.push({ path: "/" });
                })
                .catch((err) =>
                    // toast.error(
                    //     `${err.response.data.msg ?? "Não foi possível realizar o login, tente novamente."
                    //     }`
                    // )
                    console.log(`${err.response.data.msg ?? "Não foi possível realizar o login, tente novamente."}`)
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
    }
}
</script>
<style></style>