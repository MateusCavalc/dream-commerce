<template>
    <div class="h-screen grid grid-cols-8 bg-[#E9ECEF]">
        <nav class="col-span-2 bg-[#DEE2E6] px-8 py-6 flex flex-col gap-0.5 text-lg">
            <account-nav-item :active="navItemActive === 'details'" @click="navItemActive = 'details'"
                label="Account Details" icon="fa-solid fa-user"></account-nav-item>
            <account-nav-item :active="navItemActive === 'dashboard'" @click="navItemActive = 'dashboard'"
                label="Dashboard" icon="fa-solid fa-gauge"></account-nav-item>
            <account-nav-item :active="navItemActive === 'users'" @click="navItemActive = 'users'" label="Users"
                icon="fa-solid fa-users"></account-nav-item>
            <account-nav-item :active="navItemActive === 'products'" @click="navItemActive = 'products'"
                label="Products" icon="fa-solid fa-tags"></account-nav-item>
            <account-nav-item @click.prevent="logout" label="Logout"
                icon="fa-solid fa-right-from-bracket"></account-nav-item>
        </nav>
        <section class="col-span-6">
            <account-details v-if="navItemActive === 'details'"></account-details>
            <dashboard v-if="navItemActive === 'dashboard'"></dashboard>
            <users-crud v-if="navItemActive === 'users'"></users-crud>
            <products-crud v-if="navItemActive === 'products'"></products-crud>
        </section>
    </div>
</template>
<script>
import AccountDetails from './AccountDetails.vue';
import AccountNavItem from './AccountNavItem.vue';
import Dashboard from './Dashboard.vue';
import ProductsCrud from './ProductsCrud.vue';
import UsersCrud from './UsersCrud.vue';

const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

export default {
    name: "accountContent",
    data() {
        return {
            navItemActive: 'details'
        }
    },
    components: {
        AccountNavItem,
        AccountDetails,
        Dashboard,
        UsersCrud,
        ProductsCrud,
    },
    methods: {
        logout() {
            localStorage.removeItem(userKey);
            this.$store.commit("setUser", null);

            this.$router.push('/')
        }
    }
}
</script>
<style></style>