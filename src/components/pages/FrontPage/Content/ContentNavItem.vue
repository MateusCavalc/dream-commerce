<template>
    <a class="group cursor-pointer h-10 px-3 py-2 flex items-center rounded-md duration-150 hover:bg-[#495057] hover:text-[#DEE2E6] active:bg-[#495057] active:text-[#DEE2E6]"
        :class="{ 'active': active }">
        <font-awesome-icon class="h-6 w-10 mr-2 duration-500 group-hover:scale-125" :icon="icon" />
        <span class="text-lg mr-2 select-none transform ease-out duration-300"
            :style="{ transform: `translateX(${active ? translateAmount : 0}rem)` }">
            {{ label }}
        </span>
    </a>
</template>
<script>
export default {
    name: 'contentNavItem',
    props: {
        label: String,
        icon: String,
        active: Boolean,
        translateAmount: Number
    }
}
</script>
<style>
.active {
    --tw-bg-opacity: 1;
    --tw-text-opacity: 1;
    background-color: rgb(73 80 87 / var(--tw-bg-opacity));
    color: rgb(222 226 230 / var(--tw-text-opacity));
}
</style>