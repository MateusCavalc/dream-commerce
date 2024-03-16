<template>
    <div class="h-full bg-[#DEE2E6] p-1">
        <div class="bg-[#E9ECEF] border px-2 py-3 rounded-lg shadow-md mb-6">
            <div class="p-2">
                <div class="relative overflow-x-auto shadow-md rounded-lg">
                    <div class="flex justify-between items-center py-4 bg-white">
                        <h1 class="text-3xl font-semibold text-gray-700 ml-5">Products</h1>
                        <!-- Pagination start  -->
                        <div class="flex items-center py-2 gap-4 text-md bg-white align-text-bottom">
                            <font-awesome-icon v-show="this.currPage > 1" icon="fa-solid fa-caret-left"
                                class="h-6 cursor-pointer duration-300 hover:scale-150" @click="getPreviousPage" />
                            <div class="select-none">{{ `${this.currPage} of ${this.pages}` }}</div>
                            <font-awesome-icon v-show="this.currPage < this.pages" icon="fa-solid fa-caret-right"
                                class="h-6 cursor-pointer duration-300 hover:scale-150" @click="getNextPage" />
                        </div>
                        <!-- Pagination end -->
                        <div class="flex items-center">
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
                                    Categories
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
                            <!-- Table Rows Iteration -->
                            <tr v-for="product in products" :key="product.id"
                                class="bg-white border-b-2 hover:bg-gray-100">
                                <td class="px-6 py-4">
                                    <div class="text-base truncate">{{ product._id }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-base">{{ product.name }}</div>
                                </td>
                                <td class="px-6 py-4">{{ parseMoneyValue(product.price) }}</td>
                                <td class="px-6 py-4 text-wrap">{{ product.categories.join(', ') }}</td>
                                <td class="px-6 py-4 truncate"> {{ product.image }}</td>
                                <td class="px-6 py-4"> {{ product.owner.name }}
                                </td>
                                <td class="px-6 py-4">
                                    <!-- Modal toggle (Table icons) -->
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
                                        <!-- Select -->
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="categories"
                                                class="block ml-1 mb-2 text-sm font-medium text-gray-900">Categories</label>
                                            <multi-select :selectedCategories="productModal.categories"
                                                @update:selectedCategories="productModal.categories = $event"
                                                :categories="['tech', 'apparel', 'sports', 'food', 'music', 'house']"></multi-select>
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
                                                <option v-for="user in users.entries()" :key="user[0]" :value="user[0]">
                                                    {{ user[1] }}
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
import axios from 'axios'

import MultiSelect from './MultiSelect.vue'

const FormData = require('form-data')

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
    name: 'productsCrud',
    components: { MultiSelect },
    data() {
        return {
            productModal: {},
            products: [],
            users: new Map(),
            modal: '',
            showSaveModal: false,
            showDeleteModal: false,

            currPage: 1,
            total: 0,
            pages: 1
        }
    },
    methods: {
        loadProducts() {

            axios.get(`${baseApiUrl}/products`, {
                params: {
                    // Default perPage in product crud table is 6
                    perPage: 6,
                    page: this.currPage
                }
            })
                .then(resp => {
                    // parse product
                    this.products = resp.data.data.products.map(product => {
                        const parsedProduct = { ...product }

                        parsedProduct.owner = {
                            id: parseInt(parsedProduct.ownerId),
                            name: this.users.get(parseInt(parsedProduct.ownerId))
                        }

                        delete parsedProduct.ownerId

                        return parsedProduct
                    })

                    this.total = resp.data.data.total
                    this.currPage = resp.data.data.page
                    this.pages = Math.ceil(this.total / resp.data.data.perPage)

                })
                .catch(() => { })
        },
        loadModal(modal, product = {}) {
            this.modal = modal
            this.productModal = product
            this.productModal.owner = this.productModal.owner ?? {}
            this.productModal.categories = this.productModal.categories ?
                [...this.productModal.categories] : []

            this.modal === "save" || this.modal === "update" ?
                this.showSaveModal = true :
                this.showDeleteModal = true
        },
        saveModalProduct() {
            const formData = new FormData()

            formData.append('name', this.productModal.name)
            formData.append('price', this.productModal.price)
            formData.append('categories', Object.values(this.productModal.categories))
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
            formData.append('categories', Object.values(this.productModal.categories))
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
                .then(resp => {
                    this.users = resp.data.data.reduce((mapAcc, user) => {
                        mapAcc.set(parseInt(user.id), user.name)
                        return mapAcc
                    }, this.users)
                    this.loadProducts()
                })
                .catch(() => { })
        },
        parseMoneyValue(value) {
            return currencyParser(value)
        },
        getPreviousPage() {
            this.currPage--
            this.loadProducts()
        },
        getNextPage() {
            this.currPage++
            this.loadProducts()
        }
    },
    created() {
        this.getUsers()
    }
}
</script>
<style></style>