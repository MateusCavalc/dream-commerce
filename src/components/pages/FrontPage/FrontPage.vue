<template>
    <div class="front-page">
        <page-header :userLogged="user !== null"></page-header>
        <Loading v-if="validatingToken" />
        <router-view v-if="userLoaded"></router-view>
        <page-footer></page-footer>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex";

import pageHeader from "@/components/template/Header.vue";
import pageFooter from "@/components/template/Footer.vue"
import Loading from "@/components/template/LoadingValidation.vue";

const baseApiUrl = process.env.VUE_APP_API_URL;
const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

export default {
    name: "frontPage",
    computed: mapState(['user']),
    data() {
        return {
            validatingToken: false,
            userLoaded: false
        }
    },
    components: {
        pageHeader,
        pageFooter,
        Loading
    },
    methods: {
        async validateStorageUser(storageUser) {
            try {

                await axios.post(`${baseApiUrl}/token/validate`, { token: storageUser.token })
                // user session is a valid!
                // set the storage user 

                this.$store.commit("setUser", storageUser)

            } catch (err) {
                // remove if user in localStorage but with invalid/expired token
                localStorage.removeItem(userKey);
            }

        },
    },
    async created() {
        // console.log(`[FrontPage checking user] - ${this.$route.path}`)

        // if no state user
        if (!this.user) {
            // try to get user um localStorage
            const storageUser = JSON.parse(localStorage.getItem(userKey));

            // if no localStorage user
            if (!storageUser) {
                // no user but route needs one, REDIRECT
                if (this.$route.path.includes('/account')) {
                    return this.$router.push('/signin')
                }

            } else {
                // validate the localStorage user
                this.validatingToken = true;

                await this.validateStorageUser(storageUser)

                this.validatingToken = false;

            }

        }

        this.userLoaded = true

    }
};
</script>

<style>
#app .front-page {
    height: 100%;
    display: grid;
    grid-template-rows: 140px 750px 340px;
}
</style>