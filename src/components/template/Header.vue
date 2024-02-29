<template>
  <header class="header grid grid-cols-1">
    <nav class="nav bg-[#495057] text-[#b5daff] flex gap-8 px-16 text-lg">
      <a>Home</a>
      <a>Products</a>
      <a>Cart</a>
      <a>Checkout</a>
      <a>My Account</a>
      <a>About Us</a>
    </nav>
    <div class="flex items-center bg-[#DEE2E6] text-[#6C757D] px-10">
      <div class="logo flex-2 p-4 text-5xl">
        <strong class="text-[#495057] text-6xl">Dream</strong>Commerce
      </div>
      <div class="search flex-1 flex justify-center p-3">
        <input type="text" placeholder="Search" class="w-full border border-solid border-[#6C757D] rounded-lg p-2">
      </div>
      <div class="header-buttons flex justify-center gap-4">
        <button class="bg-[#E9ECEF] hover:bg-[#CED4DA] font-bold py-2 px-4 border border-[#6C757D] rounded">
          Login
        </button>
        <button class="bg-[#E9ECEF] hover:bg-[#CED4DA] font-bold py-2 px-4 border border-[#6C757D] rounded">
          My Cart
        </button>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  name: "pageHeader",
};
</script>

<style>
.header nav a {
  padding: 8px;
  text-decoration: none;
  cursor: pointer;
}

.header nav a:hover {
  background-color: #DEE2E6;
  color: #343A40;

  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
</style>