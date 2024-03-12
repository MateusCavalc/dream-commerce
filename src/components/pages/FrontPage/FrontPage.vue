<template>
    <page-header :userLogged="user !== null"></page-header>
    <router-view></router-view>
    <page-footer></page-footer>
</template>

<script>
import { mapState } from "vuex";

import pageHeader from "@/components/template/Header.vue";
import pageFooter from "@/components/template/Footer.vue"

const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

export default {
    name: "frontPage",
    computed: mapState(['user']),
    components: {
        pageHeader,
        pageFooter
    },
    created() {
        if (!this.user) {
            const storageUser = JSON.parse(localStorage.getItem(userKey));

            if (storageUser) {
                this.$store.commit("setUser", storageUser);
            }
        }
    }
};
</script>

<style></style>