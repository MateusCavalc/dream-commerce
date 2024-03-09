<template>
    <div class="h-fit content grid grid-cols-8 bg-[#E9ECEF]">
        <nav class="col-span-2 bg-[#DEE2E6] m-7 p-3 flex flex-col border border-[#6C757D] rounded-xl">
            <a class="nav-link">Tech</a>
            <hr>
            <a class="nav-link">Apparel</a>
            <hr>
            <a class="nav-link">Sports</a>
            <hr>
            <a class="nav-link">Food & Drinks</a>
            <hr>
            <a class="nav-link">Music</a>
            <hr>
            <a class="nav-link">House & Decoration</a>
        </nav>
        <section
            class="col-span-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-4 my-7 mr-7">
            <!--   ✅ Product card 1 - Starts Here 👇 -->
            <div v-for="product in products" :key="product.name"
                class="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <a href="#">
                    <img :src="`http://localhost:4000/${product.image}`" :alt="product.name"
                        class="h-52 object-cover rounded-t-xl" />
                    <div class="px-4 py-3 ">
                        <span class="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                        <p class="text-lg font-bold text-black truncate block capitalize">{{ product.name }}</p>
                        <div class="flex items-center">
                            <p class="text-lg font-semibold text-black cursor-auto my-3">{{ product.price ?? 'Free' }}
                            </p>
                            <del>
                                <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                            </del>
                            <div class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                    <path
                                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                </svg></div>
                        </div>
                    </div>
                </a>
            </div>
            <!--   🛑 Product card 1 - Ends Here  -->
        </section>
    </div>
    <page-features></page-features>
</template>

<script>
import PageFeatures from '@/components/template/Features.vue'
import axios from 'axios'

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
    name: "pageContent",
    components: {
        PageFeatures
    },
    data() {
        return {
            products: []
        }
    },
    methods: {
        getProducts() {
            axios
                .get(`${baseApiUrl}/products`)
                .then(resp => this.products = resp.data.data)
                .catch(err => console.log(`${err.response
                    ? err.response.data.msg
                    : "Erro no contato com o backend, tente novamente."
                    }`))
        }
    },
    mounted() {
        this.getProducts()
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
    background-color: #ADB5BD;
    border-radius: 8px;
}
</style>