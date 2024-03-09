<template>
    <page-header :userLogged="user"></page-header>
    <router-view></router-view>
    <page-footer></page-footer>
</template>

<script>
import { mapState } from "vuex";

import pageHeader from "@/components/template/Header.vue";
import pageFooter from "@/components/template/Footer.vue"

export default {
    name: "frontPage",
    computed: mapState(['user']),
    components: {
        pageHeader,
        pageFooter
    }
};
</script>

<style></style>