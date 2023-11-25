<template>
    <section class="w-full h-full flex flex-col justify-center align-center items-center">
        <div class="h-10 w-full font-bold text-2xl m-5 flex flex-row justify-center items-center">
            <div class="w-1/3"></div>
            <h1 class="w-1/3 text-center">List of Objects</h1>
            <router-link class="w-1/3" to="create">
                <TheSaveConfirmButton btnText="Create new" routeName="Create_object" @click="clickHandler" />
            </router-link>
        </div>
        <TheDataTable :tableData="data" class="mh-90" />
    </section>
</template>

<script>
import TheDataTable from '@/plugins/data-table/TheDataTable.vue';
import TheSaveConfirmButton from '@/components/buttons/TheSaveConfirmButton.vue';
import data from '../data.json'
export default {
    components: {
        TheDataTable,
        TheSaveConfirmButton
    },
    data() {
        return {
            data: data
        }
    },
    methods: {
        clickHandler() {
            console.log(1)
            this.$router.push({ name: 'Create_object' });
        }
    }
}
</script>

<style lang="scss" scoped></style>