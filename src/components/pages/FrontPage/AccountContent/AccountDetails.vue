<template>
    <div class="h-full bg-[#DEE2E6] p-2">
        <div class="bg-[#E9ECEF] border px-4 py-5 rounded-lg shadow-md mb-6">
            <div class="grid grid-cols-2 gap-10">
                <div>
                    <h1 class="text-xl font-semibold text-gray-700 mb-2">Account Details</h1>
                    <input id="user-id" type="hidden" v-model="user.id" />

                    <label for="name" class="block ml-2 mb-1">Name</label>
                    <input type="text" id="name" class="w-full rounded-lg border py-2 px-3" v-model="user.name">
                    <label for="email" class="block ml-2 mb-1 mt-4">E-mail</label>
                    <input type="text" id="email" class="w-full rounded-lg border py-2 px-3" v-model="user.email">

                    <div class="mt-4 flex justify-end items-center">
                        <font-awesome-icon v-show="showUpdateStatus" class="h-6 mr-2 px-2 py-1 shadow-md rounded-xl"
                            :class="`bg-[#${updateSuccess ? '9BCF53' : 'D37676'}]`"
                            :icon="`fa-solid ${updateSuccess ? 'fa-check' : 'fa-xmark'}`" />
                        <button class=" bg-[#6C757D] text-white px-4 py-2 rounded-lg hover:bg-[#343A40]"
                            @click="save">Salvar</button>
                    </div>
                </div>
                <div class="p-4 border rounded-lg shadow-md">
                    <label for="new-password" class="block ml-2 mb-1">New Password</label>
                    <input type="password" id="new-password" class="w-full rounded-lg border py-2 px-3"
                        v-model="newPassword">
                    <label for="new-password-confirmation" class="block ml-2 mb-1 mt-4">Password Confirmation</label>
                    <input type="password" id="new-password-confirmation" class="w-full rounded-lg border py-2 px-3"
                        v-model="newPasswordConfirmation">

                    <div class="mt-4 flex justify-end items-center">
                        <font-awesome-icon v-show="showUpdatePswdStatus" class="h-6 mr-2 px-2 py-1 shadow-md rounded-xl"
                            :class="`bg-[#${updatePswdSuccess ? '9BCF53' : 'D37676'}]`"
                            :icon="`fa-solid ${updatePswdSuccess ? 'fa-check' : 'fa-xmark'}`" />
                        <button :class="{ 'disabled': !newPassword || !newPasswordConfirmation }"
                            class=" bg-[#6C757D] text-white px-4 py-2 rounded-lg hover:bg-[#343A40]"
                            @click="updatePassword">Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'

const baseApiUrl = process.env.VUE_APP_API_URL;
const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

export default {
    name: 'accountDetails',
    data() {
        return {
            user: {},
            newPassword: '',
            newPasswordConfirmation: '',
            showUpdateStatus: false,
            updateSuccess: false,
            showUpdatePswdStatus: false,
            updatePswdSuccess: false
        }
    },
    mounted() {
        if (!this.$store.state.user) {
            this.$router.push('/signin')
        }

        this.user = this.$store.state.user ?? {}
    },
    methods: {
        save() {
            axios.put(`${baseApiUrl}/users/${this.user.id}`, {
                name: this.user.name,
                email: this.user.email,
            })
                .then(() => {
                    this.$store.commit("setUser", this.user);
                    localStorage.setItem(userKey, JSON.stringify(this.user));
                    this.updateSuccess = true
                })
                .catch(() => this.updateSuccess = false)
                .finally(() => {
                    this.showUpdateStatus = true
                    setTimeout(() => this.showUpdateStatus = false, 2000)
                })
        },
        updatePassword() {
            axios.put(`${baseApiUrl}/users/pswd/${this.user.id}`, {
                password: this.newPassword,
                passwordConfirmation: this.newPasswordConfirmation,
            })
                .then(() => {
                    this.newPassword = ''
                    this.newPasswordConfirmation = ''
                    this.updatePswdSuccess = true
                })
                .catch(() => this.updatePswdSuccess = false)
                .finally(() => {
                    this.showUpdatePswdStatus = true
                    setTimeout(() => this.showUpdatePswdStatus = false, 2000)
                })
        }
    }
}
</script>
<style>
button.disabled {
    pointer-events: none;
    opacity: 0.5;
}
</style>