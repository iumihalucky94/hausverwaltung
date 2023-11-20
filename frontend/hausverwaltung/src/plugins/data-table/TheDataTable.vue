<template>
    <table :tableData="tableData" @click="display_data">
        <TheDataTableHeader :tableHeader="tableHeader" />
        <TheDataTableRow :tableBody="tableBody" />
    </table>
</template>

<script >
import TheDataTableHeader from './TheDataTableHeader.vue'
import TheDataTableRow from './TheDataTableRow.vue'

export default {
    components: {
        TheDataTableHeader,
        TheDataTableRow
    },
    props: {
        tableData: Object,
        require: true
    },
    data() {
        return {
            tableHeader: Object,
            tableBody: Object
        }
    }, watch: {
        tableData: {
            handler(newTableData) {
                this.splitTableData(newTableData);
            },
            immediate: true
        }
    },
    methods: {
        splitTableData(tableData) {
            if (tableData) {
                this.tableHeader = tableData.header;
                this.tableBody = tableData.body;
            }
        }
    },
    mounted() {
        this.splitTableData(this.tableData);
    }

}
</script>

<style lang="scss" scoped></style>