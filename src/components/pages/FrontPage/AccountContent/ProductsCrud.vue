<template>
    <div class="h-full bg-[#DEE2E6] p-1">
        <div class="bg-[#E9ECEF] border px-2 py-3 rounded-lg shadow-md mb-6">
            <div class="p-2">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div
                        class="flex justify-between items-center md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
                        <h1 class="text-3xl font-semibold text-gray-700 ml-5">Products</h1>
                        <div class="flex">
                            <button class="bg-[#426d19c9] text-white px-4 py-2 rounded-lg hover:bg-[#416D19] mr-5"
                                @click="loadModal('save', { owner: {} })">New Product</button>
                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <font-awesome-icon class="w-4 h-4 text-gray-500" icon="magnifying-glass" />
                                </div>
                                <input type="text" id="table-search"
                                    class="mr-3 p-2 ps-8 text-sm text-gray-900 outline-none border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-[#6C757D]"
                                    placeholder="Search for products">
                            </div>
                        </div>
                    </div>
                    <!-- Table -->
                    <table class="table-fixed w-full text-sm text-left">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Owner
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product.id"
                                class="bg-white border-b hover:bg-gray-100">
                                <td class="px-6 py-4">
                                    <div class="text-base truncate">{{ product._id }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-base">{{ product.name }}</div>
                                </td>
                                <td class="px-6 py-4">{{ parseMoneyValue(product.price) }}</td>
                                <td class="px-6 py-4 truncate"> {{ product.image }}</td>
                                <td class="px-6 py-4"> {{ product.owner.name }}
                                </td>
                                <td class="px-6 py-4">
                                    <!-- Modal toggle -->
                                    <a class="cursor-pointer" @click.prevent="loadModal('update', { ...product })">
                                        <font-awesome-icon class="h-5" icon="fa-regular fa-pen-to-square" />
                                    </a>
                                    <a class="cursor-pointer" @click.prevent="loadModal('delete', product)">
                                        <font-awesome-icon class="h-5 ml-2" icon="fa-regular fa-trash-can" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Edit product modal -->
                    <div v-if="showSaveModal" tabindex="-1"
                        class="fixed z-20 p-4 inset-x-0 inset-y-0 flex items-center justify-center bg-[#0002]">
                        <div class="w-full max-w-2xl max-h-full">
                            <!-- Modal content -->
                            <div class="relative bg-white rounded-lg border border-[#6C757D] shadow-xl">
                                <!-- Modal header -->
                                <div class="flex items-start justify-between p-4 border-b rounded-t">
                                    <h3 class="text-xl font-semibold text-gray-900">
                                        {{ modal === 'save' ? 'New Product' : 'Edit Product' }}
                                    </h3>
                                    <button type="button"
                                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                        @click="showSaveModal = false">
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
                                        <input id="productModal-id" type="hidden" v-model="productModal._id" />
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="name"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input type="text" name="name" id="name"
                                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                v-model="productModal.name">
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="price"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Price</label>
                                            <input type="text" name="price" id="price"
                                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                v-model="productModal.price">
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="image"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Image</label>
                                            <input type="file" accept="image/*" name="image" id="image"
                                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                @change="loadImage" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="owner"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Owner</label>
                                            <select v-model="productModal.owner.id"
                                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                                <option v-if="modal === 'save'" :value="undefined" disabled>Select a
                                                    owner</option>
                                                <option v-for="user in users" :key="user.id" :value="user.id">
                                                    {{ user.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- Modal footer -->
                                <div
                                    class="flex justify-end items-center p-4 space-x-3 border-t border-gray-200 rounded-b">
                                    <button class="bg-[#6C757D] text-white px-4 py-2 rounded-lg hover:bg-[#343A40]"
                                        @click.prevent="modal === 'save' ? saveModalProduct() : updateModalProduct()">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Delete product modal -->
                    <div v-if="showDeleteModal" tabindex="-1"
                        class="fixed z-20 p-4 inset-x-0 inset-y-0 flex items-center justify-center bg-[#0002]">
                        <div class="w-full max-w-2xl max-h-full">
                            <!-- Modal content -->
                            <div class="relative bg-white rounded-lg border border-[#6C757D] shadow-xl">
                                <!-- Modal header -->
                                <div class="flex items-start justify-between p-4 border-b rounded-t">
                                    <h3 class="text-xl font-semibold text-gray-900">
                                        Delete product ?
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
                                        <input id="productModal-id" type="hidden" v-model="productModal._id" />
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="name"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input type="text" name="name" id="name"
                                                class="pointer-events-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                v-model="productModal.name" readonly>
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="price"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Price</label>
                                            <input type="text" name="price" id="price"
                                                class="pointer-events-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                v-model="productModal.price" readonly>
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="image"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Image</label>
                                            <input type="text" name="image" id="image"
                                                class="pointer-events-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                v-model="productModal.image" readonly>
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="owner"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Owner</label>
                                            <input type="text" name="owner" id="owner"
                                                class="pointer-events-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                                v-model="productModal.owner.name" readonly>
                                        </div>
                                    </div>
                                </div>
                                <!-- Modal footer -->
                                <div
                                    class="flex justify-end items-center p-4 space-x-3 border-t border-gray-200 rounded-b">
                                    <button class="bg-[#6C757D] text-white px-4 py-2 rounded-lg hover:bg-[#343A40]"
                                        @click="showDeleteModal = false">Cancel</button>
                                    <button class="bg-[#d37676d7] text-white px-4 py-2 rounded-lg hover:bg-[#d37676]"
                                        @click="deleteProduct(productModal._id)">Confirm</button>
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
import currencyParser from '@/utils/currencyParser'

const axios = require('axios')
const FormData = require('form-data')

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
    name: 'productsCrud',
    data() {
        return {
            productModal: {},
            products: [],
            users: [],
            modal: '',
            showSaveModal: false,
            showDeleteModal: false
        }
    },
    methods: {
        loadProducts() {
            axios.get(`${baseApiUrl}/products`)
                .then(resp => {
                    this.products = resp.data.data.map(product => {
                        const productWithOwner = { ...product }
                        productWithOwner.owner = { ...this.users.filter(user => user.id == product.ownerId)[0] }
                        delete productWithOwner.ownerId

                        return productWithOwner
                    })
                })
                .catch(() => { })
        },
        loadModal(modal, product = {}) {
            this.modal = modal
            this.productModal = product

            this.modal === "save" || this.modal === "update" ?
                this.showSaveModal = true :
                this.showDeleteModal = true
        },
        saveModalProduct() {
            const formData = new FormData()

            formData.append('name', this.productModal.name)
            formData.append('price', this.productModal.price)
            formData.append('image', this.productModal.image)
            formData.append('ownerId', this.productModal.owner.id)

            axios.post(`${baseApiUrl}/products`, formData)
                .then(() => {
                    this.loadProducts()
                    this.showSaveModal = false
                })
                .catch(() => { })
        },
        loadImage(e) {
            this.productModal.image = e.target.files[0]
        },
        updateModalProduct() {
            const formData = new FormData()

            formData.append('name', this.productModal.name)
            formData.append('price', this.productModal.price)
            formData.append('image', this.productModal.image)
            formData.append('ownerId', this.productModal.owner.id)

            axios.put(`${baseApiUrl}/products/${this.productModal._id}`, formData)
                .then(() => {
                    this.loadProducts()
                    this.showSaveModal = false
                })
                .catch(() => { })
        },
        deleteProduct(id) {
            axios.delete(`${baseApiUrl}/products/${id}`)
                .then(() => {
                    this.loadProducts()
                    this.showDeleteModal = false
                })
                .catch(() => { })
        },
        getUsers() {
            axios.get(`${baseApiUrl}/users/names`)
                .then(resp => this.users = resp.data.data)
                .catch(() => { })
        },
        parseMoneyValue(value) {
            return currencyParser(value)
        }
    },
    created() {
        this.getUsers()
        this.loadProducts()
    }
}
</script>
<style></style>