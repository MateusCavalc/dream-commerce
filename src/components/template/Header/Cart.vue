<template>
    <div class="absolute z-50 top-full right-0 overflow-y-auto flex flex-col justify-between w-full h-fit bg-[#E9ECEF] border-b border-x border-[#6C757D] rounded"
        :class="{ 'min-h-[10rem] max-h-[30rem]': anyProducts }">
        <div class="flex flex-col items-stretch">
            <span v-if="!anyProducts" class="my-2 text-center">No items</span>
            <div v-for="product in products" :key="product._id"
                class="flex justify-between items-center text-sm p-2 mx-1 my-0.5 bg-white border rounded-md">
                <div class="flex flex-col items-start">
                    <span>{{ product.name }}</span>
                    <strong>{{ parsePrice(product.price) }}</strong>
                </div>
                <div class="text-3xl content-center">
                    <font-awesome-icon icon="fa-regular fa-square-minus" class="cursor-pointer"
                        @click="removeProductFromCart(product)" />
                </div>
            </div>
            <span v-if="anyProducts" class="mx-2 my-1">Total: {{ total }}</span>
        </div>
        <button class="text-sm px-2 py-1 m-1 border border-[#6C757D] rounded hover:bg-[#426d19c9] hover:text-white">
            Checkout
        </button>
    </div>
</template>
<script>
import currencyParser from '@/utils/currencyParser';

export default {
    name: "CartModal",
    props: {
        products: Array
    },
    data() {
        return {
            cartProducts: this.products
        }
    },
    computed: {
        anyProducts() {
            return this.products.length > 0
        },
        total() {
            return currencyParser(this.products.reduce((acc, product) => {
                acc += product.price
                return acc
            }, 0))
        }
    },
    methods: {
        removeProductFromCart(product) {
            this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
            this.$emit('update:cartProducts', this.cartProducts)
        },
        parsePrice(price) {
            return currencyParser(price) ?? 'Free'
        }
    }
}
</script>
<style></style>