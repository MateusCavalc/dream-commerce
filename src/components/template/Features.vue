<template>
    <div class="feature-cards flex justify-around bg-[#F8F9FA]">
        <article
            class="flex flex-col items-center max-w-sm border border-[#DEE2E6] rounded-lg shadow-lg my-8 bg-[#E9ECEF] px-6 py-4">
            <font-awesome-icon class="h-16 my-4" icon="fa-regular fa-credit-card" />
            <span class="font-bold text-xl mb-2">Secure Payment</span>
            <p class="text-gray-600 text-base text-center my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </article>
        <article
            class="flex flex-col items-center max-w-sm border border-[#DEE2E6] rounded-lg shadow-lg my-8 bg-[#E9ECEF] px-6 py-4">
            <font-awesome-icon class="h-16 my-4" icon="fa-solid fa-dolly" />
            <span class="font-bold text-xl mb-2">Worldwide Delivery</span>
            <p class="text-gray-600 text-base text-center my-2">
                Sed sodales lorem in neque venenatis ultrices. Maecenas sed sodales augue.
            </p>
        </article>
        <article
            class="flex flex-col items-center max-w-sm border border-[#DEE2E6] rounded-lg shadow-lg my-8 bg-[#E9ECEF] px-6 py-4">
            <font-awesome-icon class="h-16 my-4" icon="fa-solid fa-arrows-rotate" />
            <span class="font-bold text-xl mb-2">Worldwide Delivery</span>
            <p class="text-gray-600 text-base text-center my-2">
                Donec maximus mauris ut ipsum facilisis, eu posuere ipsum vestibulum. Ut quis aliquet erat.
            </p>
        </article>
        <article
            class="flex flex-col items-center max-w-sm border border-[#DEE2E6] rounded-lg shadow-lg my-8 bg-[#E9ECEF] px-6 py-4">
            <font-awesome-icon class="h-16 my-4" icon="fa-regular fa-comments" />
            <span class="font-bold text-xl mb-2">24/7 Support</span>
            <p class="text-gray-600 text-base text-center my-2">
                Donec commodo urna et auctor scelerisque. Donec justo dolor, convallis sit amet dui at, congue feugiat
                odio.
            </p>
        </article>
    </div>
</template>

<script>
export default {
    name: "pageFeatures",
}
</script>

<style>
.feature-cards article {
    width: 22%;
}
</style>