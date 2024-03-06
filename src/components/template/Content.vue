<template>
    <div class="h-fit content grid grid-cols-12 bg-[#E9ECEF]">
        <nav class="col-span-3 bg-[#DEE2E6] m-7 p-3 flex flex-col border border-[#6C757D] rounded-xl">
            <a class="nav-link">Home</a>
            <hr>
            <a class="nav-link">Best Selling</a>
            <hr>
            <a class="nav-link">New Arrivals</a>
            <hr>
            <a class="nav-link">Fashion & Beauty</a>
            <hr>
            <a class="nav-link">Kids & Babies Clothes</a>
            <hr>
            <a class="nav-link">Men & Women Clothes</a>
            <hr>
            <a class="nav-link">Gadgets & Accessories</a>
            <hr>
            <a class="nav-link">Electronics & Accessories</a>
            <hr>
        </nav>
        <div class="col-span-5 mx-5 my-7">
            <img class="rounded-xl" alt="fone" src="@/assets/images/fone.jpg">
        </div>
        <div class="col-span-4 mx-5 my-7 flex flex-col items-center gap-2">
            <img class="w-4/5 rounded-xl" alt="tenis_1" src="@/assets/images/tenis1.jpg">
            <img class="w-4/5 rounded-xl" alt="tenis_2" src="@/assets/images/tenis2.jpg">
        </div>
    </div>
</template>
<script>
export default {
    name: "pageContent"
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