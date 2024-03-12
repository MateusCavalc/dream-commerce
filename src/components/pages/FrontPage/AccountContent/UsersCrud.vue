<template>
    <div class="h-full bg-[#DEE2E6] p-1">
        <div class="bg-[#E9ECEF] border px-2 py-3 rounded-lg shadow-md mb-6">
            <div class="p-2">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div
                        class="flex justify-between items-center md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
                        <h1 class="text-3xl font-semibold text-gray-700 ml-5">Users</h1>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <font-awesome-icon class="w-4 h-4 text-gray-500" icon="magnifying-glass" />
                            </div>
                            <input type="text" id="table-search"
                                class="mr-3 p-2 ps-8 text-sm text-gray-900 outline-none border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-[#6C757D]"
                                placeholder="Search for users">
                        </div>
                    </div>
                    <!-- Table -->
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    E-mail
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Admin
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id" class="bg-white border-b hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    <div class="text-base">{{ user.id }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-base">{{ user.name }}</div>
                                </td>
                                <td class="px-6 py-4">{{ user.email }}</td>
                                <td class="px-6 py-4"> {{ user.admin ? 'Sim' : 'Não' }}</td>
                                <td class="px-6 py-4">
                                    <!-- Modal toggle -->
                                    <a class="cursor-pointer" @click.prevent="loadModal('update', { ...user })">
                                        <font-awesome-icon class="h-5" icon="fa-regular fa-pen-to-square" />
                                    </a>
                                    <a class="cursor-pointer" @click.prevent="loadModal('delete', user)">
                                        <font-awesome-icon class="h-5 ml-2" icon="fa-regular fa-trash-can" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Edit user modal -->
                    <div v-if="showUpdateModal" tabindex="-1"
                        class="fixed z-20 p-4 inset-x-0 inset-y-0 flex items-center justify-center bg-[#0002]">
                        <div class="w-full max-w-2xl max-h-full">
                            <!-- Modal content -->
                            <div class="relative bg-white rounded-lg border border-[#6C757D] shadow-xl">
                                <!-- Modal header -->
                                <div class="flex items-start justify-between p-4 border-b rounded-t">
                                    <h3 class="text-xl font-semibold text-gray-900">
                                        Edit user
                                    </h3>
                                    <button type="button"
                                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                        @click="showUpdateModal = false">
                                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                                <!-- Modal body -->
                                <div class="p-6 space-y-6">
                                    <div class="grid grid-cols-6 gap-6">
                                        <input id="userModal-id" type="hidden" v-model="userModal.id" />
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="name"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input type="text" name="name" id="name"
                                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                                v-model="userModal.name">
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="email"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">E-mail</label>
                                            <input type="text" name="email" id="email"
                                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                                v-model="userModal.email">
                                        </div>
                                    </div>
                                </div>
                                <!-- Modal footer -->
                                <div
                                    class="flex justify-end items-center p-4 space-x-3 border-t border-gray-200 rounded-b">
                                    <button class="bg-[#6C757D] text-white px-4 py-2 rounded-lg hover:bg-[#343A40]"
                                        @click="updateModalUser">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Delete user modal -->
                    <div v-if="showDeleteModal" tabindex="-1"
                        class="fixed z-20 p-4 inset-x-0 inset-y-0 flex items-center justify-center bg-[#0002]">
                        <div class="w-full max-w-2xl max-h-full">
                            <!-- Modal content -->
                            <div class="relative bg-white rounded-lg border border-[#6C757D] shadow-xl">
                                <!-- Modal header -->
                                <div class="flex items-start justify-between p-4 border-b rounded-t">
                                    <h3 class="text-xl font-semibold text-gray-900">
                                        Delete user ?
                                    </h3>
                                    <button type="button"
                                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                        @click="showDeleteModal = false">
                                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                                <!-- Modal body -->
                                <div class="p-6 space-y-6">
                                    <div class="grid grid-cols-6 gap-6">
                                        <input id="userModal-id" type="hidden" v-model="userModal.id" />
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="name"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input type="text" name="name" id="name"
                                                class="pointer-events-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                                v-model="userModal.name" readonly>
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="email"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">E-mail</label>
                                            <input type="text" name="email" id="email"
                                                class="pointer-events-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                                v-model="userModal.email" readonly>
                                        </div>
                                    </div>
                                </div>
                                <!-- Modal footer -->
                                <div
                                    class="flex justify-end items-center p-4 space-x-3 border-t border-gray-200 rounded-b">
                                    <button class="bg-[#6C757D] text-white px-4 py-2 rounded-lg hover:bg-[#343A40]"
                                        @click="showDeleteModal = false">Cancel</button>
                                    <button class="bg-[#d37676d7] text-white px-4 py-2 rounded-lg hover:bg-[#d37676]"
                                        @click="deleteUser(userModal.id)">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const axios = require('axios')

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
    name: 'usersCrud',
    data() {
        return {
            userModal: {},
            users: [],
            showUpdateModal: false,
            showDeleteModal: false
        }
    },
    methods: {
        loadUsers() {
            axios.get(`${baseApiUrl}/users`)
                .then(resp => this.users = resp.data.data)
                .catch(() => { })
        },
        loadModal(modal, user) {
            this.userModal = user

            modal === "update" ?
                this.showUpdateModal = true :
                this.showDeleteModal = true
        },
        updateModalUser() {
            axios.put(`${baseApiUrl}/users/${this.userModal.id}`, {
                name: this.userModal.name,
                email: this.userModal.email,
            })
                .then(() => {
                    this.loadUsers()
                    this.showUpdateModal = false
                })
                .catch(() => { })
        },
        deleteUser(id) {
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.loadUsers()
                    this.showDeleteModal = false
                })
                .catch(() => { })
        }
    },
    mounted() {
        this.loadUsers()
    }
}
</script>
<style></style>