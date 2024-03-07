<template>
    <page-header :userLogged="user"></page-header>
    <page-content></page-content>
    <page-features></page-features>
    <page-footer></page-footer>
</template>

<script>
import { mapState } from "vuex";

import pageHeader from "@/components/template/Header.vue";
import pageContent from "@/components/template/Content.vue";
import pageFeatures from "@/components/template/Features.vue"
import pageFooter from "@/components/template/Footer.vue"

export default {
    name: "frontPage",
    computed: mapState(['user']),
    components: {
        pageHeader,
        pageContent,
        pageFeatures,
        pageFooter
    }
};
</script>

<style></style>