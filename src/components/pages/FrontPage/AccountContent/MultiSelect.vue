<template>
    <div class="relative">
        <div class="flex justify-between items-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            @click="hideCategories = !hideCategories">
            <span v-if="modalSelectedCategories.length === 0" class="select-none text-gray-500">Select
                categories</span>
            <span v-else class="select-none">{{ selectedCategoriesStr }}</span>
            <font-awesome-icon class="cursor-pointer" icon="fa-solid fa-sort" />
        </div>
        <div v-show="!hideCategories"
            class="absolute w-full h-32 flex flex-col p1 border-x-2 border-b-2 rounded-b-lg overflow-y-scroll">
            <a v-for="category in categories" :key="category" :value="category" class="px-2 py-1 bg-white">
                <input type="checkbox" :checked="modalSelectedCategories.indexOf(category) !== -1" :value="category"
                    @change="check($event)">
                <span class="capitalize text-sm select-none ml-2">{{ category }}</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'multiSelect',
    props: {
        categories: Array,
        selectedCategories: Array
    },
    data() {
        return {
            hideCategories: true,
            modalSelectedCategories: this.selectedCategories
        }
    },
    computed: {
        selectedCategoriesStr() {
            return this.modalSelectedCategories.join(', ')
        }
    },
    methods: {
        check(e) {
            this.$nextTick(() => {
                const index = this.modalSelectedCategories.indexOf(e.target.value)
                if (index === -1) {
                    this.modalSelectedCategories.push(e.target.value)
                }
                else {
                    this.modalSelectedCategories.splice(index, 1)
                }

                this.$emit('update:selectedCategories', this.modalSelectedCategories)
            })
        }
    }
}
</script>
<style></style>