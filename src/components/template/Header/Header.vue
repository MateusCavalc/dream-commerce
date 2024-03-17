<template>
  <header class="header grid grid-cols-1">
    <div class="flex items-center bg-[#DEE2E6] text-[#6C757D] px-10">
      <router-link to="/">
        <div class="flex-2 px-4 py-2 text-5xl">
          <strong class="text-[#495057] text-6xl">Dream</strong>Commerce
        </div>
      </router-link>
      <div class="search flex-1 flex items-center p-3 relative">
        <input type="text" placeholder="Search"
          class="w-full border border-solid border-[#6C757D] rounded-lg py-2 px-3 outline-none">
        <a
          class="h-[40px] w-[52px] cursor-pointer flex justify-center items-center absolute right-[13px] hover:bg-[#E9ECEF]">
          <font-awesome-icon icon="magnifying-glass" />
        </a>
      </div>
      <div class="relative header-actions">
        <router-link v-if="!userLogged" to="/signin">
          <button
            class="bg-[#E9ECEF] hover:bg-[#CED4DA] font-bold py-2 px-4 border border-solid border-[#6C757D] rounded">
            Login
          </button>
        </router-link>
        <div v-else class="grid grid-cols-2 gap-x-2">
          <router-link class="grid-span-1" to="/account">
            <button
              class="bg-[#E9ECEF] hover:bg-[#CED4DA] font-bold py-2 px-4 border border-solid border-[#6C757D] rounded">
              Account
            </button>
          </router-link>
          <div @mouseover="showCart = true" @mouseleave="showCart = false">
            <div
              class="grid-span-1 text-center select-none bg-[#E9ECEF] hover:bg-[#CED4DA] font-bold py-2 px-4 border border-solid border-[#6C757D] rounded">
              Cart ({{ cartProducts.length }})
            </div>
            <cart-modal v-if="showCart" :products="cartProducts"></cart-modal>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CartModal from './Cart'

export default {
  name: "pageHeader",
  components: { CartModal },
  props: {
    userLogged: Boolean,
    cartProducts: Array
  },
  data() {
    return {
      showCart: false
    }
  }
};
</script>

<style>
.header .search a:hover {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.header .search svg {
  height: 20px;
}
</style>