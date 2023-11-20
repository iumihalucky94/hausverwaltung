<template>
    <section class="w-full h-full flex flex-col justify-center align-center items-center">
        <div class="h-10 font-bold text-2xl m-5">Some text</div>
        <TheDataTable :tableData="data" class="mh-90" />
    </section>
</template>

<script>
import TheDataTable from '../plugins/data-table/TheDataTable.vue';
import data from './data.json'
export default {
    components: {
        TheDataTable
    },
    data() {
        return {
            data: data
        }
    }
}
</script>

<style lang="scss" scoped></style>