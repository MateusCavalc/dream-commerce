<template>
    <footer class="flex justify-around bg-[#F8F9FA] mb-4">
        <div class="flex flex-col">
            <span class="text-2xl font-bold mx-1 my-3">Get In Touch</span>
            <span class="my-1">
                <font-awesome-icon class="mr-1" icon="map-pin" /> 123 DreamCommerce, Los Angeles, USA
            </span>
            <span class="my-1">
                <font-awesome-icon class="mr-1" icon="fa-regular fa-envelope" /> email@example.com
            </span>
            <span class="my-1">
                <font-awesome-icon class="mr-1" icon="phone" /> +123-456-7890
            </span>
        </div>
        <div class="flex flex-col">
            <span class="text-2xl font-bold mx-1 my-3">Follow Us</span>
            <div class="flex justify-around gap-2">
                <font-awesome-icon
                    class="h-6 p-2 border-2 border-[#6C757D] rounded-md cursor-pointer transition hover:text-[#495057] hover:border-[#ADB5BD]"
                    icon="fa-brands fa-twitter" />
                <font-awesome-icon
                    class="h-6 p-2 border-2 border-[#6C757D] rounded-md cursor-pointer transition hover:text-[#495057] hover:border-[#ADB5BD]"
                    icon="fa-brands fa-facebook" />
                <font-awesome-icon
                    class="h-6 p-2 border-2 border-[#6C757D] rounded-md cursor-pointer transition hover:text-[#495057] hover:border-[#ADB5BD]"
                    icon="fa-brands fa-linkedin" />
                <font-awesome-icon
                    class="h-6 p-2 border-2 border-[#6C757D] rounded-md cursor-pointer transition hover:text-[#495057] hover:border-[#ADB5BD]"
                    icon="fa-brands fa-instagram" />
                <font-awesome-icon
                    class="h-6 p-2 border-2 border-[#6C757D] rounded-md cursor-pointer transition hover:text-[#495057] hover:border-[#ADB5BD]"
                    icon="fa-brands fa-youtube" />
            </div>
        </div>
        <div class="flex flex-col">
            <span class="text-2xl font-bold mx-1 my-3">Company Info</span>
            <span class="relative group my-1">
                <font-awesome-icon class="transition-opacity group-hover:opacity-0 mr-2" icon="caret-right" />
                <font-awesome-icon class="absolute opacity-0 left-0 top-1 transition-opacity group-hover:opacity-100"
                    icon="angles-right" />
                About
                Us
            </span>
            <span class="relative group my-1">
                <font-awesome-icon class="transition-opacity group-hover:opacity-0 mr-2" icon="caret-right" />
                <font-awesome-icon class="absolute opacity-0 left-0 top-1 transition-opacity group-hover:opacity-100"
                    icon="angles-right" /> Privacy Policy
            </span>
            <span class="relative group my-1">
                <font-awesome-icon class="transition-opacity group-hover:opacity-0 mr-2" icon="caret-right" />
                <font-awesome-icon class="absolute opacity-0 left-0 top-1 transition-opacity group-hover:opacity-100"
                    icon="angles-right" /> Term &
                Condition
            </span>
        </div>
        <div class="flex flex-col">
            <span class="text-2xl font-bold mx-1 my-3">Purchase Info</span>
            <span class="relative group my-1">
                <font-awesome-icon class="transition-opacity group-hover:opacity-0 mr-2" icon="caret-right" />
                <font-awesome-icon class="absolute opacity-0 left-0 top-1 transition-opacity group-hover:opacity-100"
                    icon="angles-right" />
                Payment Policy
            </span>
            <span class="relative group my-1">
                <font-awesome-icon class="transition-opacity group-hover:opacity-0 mr-2" icon="caret-right" />
                <font-awesome-icon class="absolute opacity-0 left-0 top-1 transition-opacity group-hover:opacity-100"
                    icon="angles-right" /> Shipping Policy
            </span>
            <span class="relative group my-1">
                <font-awesome-icon class="transition-opacity group-hover:opacity-0 mr-2" icon="caret-right" />
                <font-awesome-icon class="absolute opacity-0 left-0 top-1 transition-opacity group-hover:opacity-100"
                    icon="angles-right" /> Return Policy
            </span>
        </div>
    </footer>
    <div class="bg-[#495057] h-4"></div>
</template>

<script>
export default {
    name: "pageFooter",
}
</script>

<style></style>