<template>
    <section>
        <TheDataTable :tableData="data" />
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