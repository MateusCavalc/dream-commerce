<template>
    <div class="h-fit content grid grid-cols-8 bg-[#E9ECEF]">
        <nav class="col-span-2 h-fit w-60 m-7 p-3 flex flex-col bg-[#DEE2E6] border border-[#6C757D] rounded-xl">
            <content-nav-item :active="navActiveItems.has('tech')" @click="clickNavItem('tech')" label="Tech"
                :translateAmount="6.5" icon="fa-solid fa-microchip"></content-nav-item>
            <hr>
            <content-nav-item :active="navActiveItems.has('apparel')" @click="clickNavItem('apparel')" label="Apparel"
                :translateAmount="5" icon="fa-solid fa-shirt"></content-nav-item>
            <hr>
            <content-nav-item :active="navActiveItems.has('sports')" @click="clickNavItem('sports')" label="Sports"
                :translateAmount="5.6" icon="fa-solid fa-dumbbell"></content-nav-item>
            <hr>
            <content-nav-item :active="navActiveItems.has('food')" @click="clickNavItem('food')" label="Food"
                :translateAmount="6.3" icon="fa-solid fa-utensils"></content-nav-item>
            <hr>
            <content-nav-item :active="navActiveItems.has('music')" @click="clickNavItem('music')" label="Music"
                :translateAmount="5.9" icon="fa-solid fa-music"></content-nav-item>
            <hr>
            <content-nav-item :active="navActiveItems.has('house')" @click="clickNavItem('house')" label="House"
                :translateAmount="5.6" icon="fa-solid fa-house"></content-nav-item>
        </nav>
        <section
            class="col-span-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-4 my-7 mr-7">
            <!-- Product card -->
            <div v-for="product in products" :key="product.name"
                class="h-fit bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <a href="#">
                    <img :src="`http://localhost:4000/${product.image}`" :alt="product.name"
                        class="h-52 object-cover rounded-t-xl" />
                    <div class="px-4 pt-3 pb-2 ">
                        <p class="text-lg font-bold text-black truncate block capitalize">{{ product.name }}</p>
                        <span class="text-gray-400 text-sm mr-3">by {{ product.ownerName }}</span>
                        <div class="flex justify-between items-end">
                            <p class="text-lg font-semibold text-black mt-2">{{ product.price }}</p>
                            <span class="text-gray-400 text-sm">{{ product.categories.join(', ') }}</span>
                        </div>
                    </div>
                </a>
            </div>
            <!-- Product card -->
        </section>
    </div>
    <page-features></page-features>
</template>

<script>
import PageFeatures from '@/components/template/Features.vue'
import ContentNavItem from './ContentNavItem.vue';
import axios from 'axios'
import currencyParser from '@/utils/currencyParser';

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
    name: "pageContent",
    components: {
        PageFeatures,
        ContentNavItem
    },
    data() {
        return {
            products: [],
            users: new Map(),
            navActiveItems: new Set()
        }
    },
    methods: {
        getProducts() {
            axios.get(`${baseApiUrl}/products`, {
                params: {
                    filter: [...this.navActiveItems].join(',')
                }
            })
                .then(resp => {
                    this.products = resp.data.data.map(product => {
                        const parsedProduct = { ...product }
                        parsedProduct.price = product.price ? currencyParser(parsedProduct.price) : 'Free'
                        parsedProduct.ownerName = this.users.get(parseInt(parsedProduct.ownerId))
                        delete parsedProduct.ownerId

                        return parsedProduct
                    })
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
                    this.getProducts()
                })
                .catch(() => { })
        },
        clickNavItem(item) {
            if (this.navActiveItems.has(item)) {
                this.navActiveItems.delete(item)
            }
            else {
                this.navActiveItems.add(item)
            }

            this.getUsers()
        }
    },
    created() {
        this.getUsers()
    }
}
</script>

<style>
.content hr {
    margin: 10px 0;
    border-top: 1px solid #ADB5BD;
}

.content nav a {
    padding: 5px 10px;
    cursor: pointer;
}

.content nav a:hover {
    border-radius: 8px;
}
</style>