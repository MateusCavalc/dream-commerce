<template>
    <a class="group cursor-pointer px-3 py-2 rounded-md duration-150 bg-[#E9ECEF] hover:bg-[#495057] hover:text-[#DEE2E6] active:bg-[#495057] active:text-[#DEE2E6]"
        :class="{ 'active': active }">
        <font-awesome-icon class="w-5 mr-2 duration-500 group-hover:scale-125" :icon="icon" />
        <span>
            {{ label }}
        </span>
    </a>
</template>
<script>
export default {
    name: 'accountNavItem',
    props: {
        label: String,
        icon: String,
        active: Boolean
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