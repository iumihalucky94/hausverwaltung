<template>
    <table class="w-90w text-left text-sm font-light">
        <TheDataTableHeader :tableHeader="tableHeader" />
        <TheDataTableRow :tableBody="tableBody" />
    </table>
</template>

<script >
import TheDataTableHeader from './TheDataTableHeader.vue'
import TheDataTableRow from './TheDataTableRow.vue'
import tableData from '@/data/tableData.json'

export default {
    components: {
        TheDataTableHeader,
        TheDataTableRow
    },
    data() {
        return {
            tableHeader: {},
            tableBody: {}
        }
    },
    created() {
        this.fetchData();
        this.tableHeader = tableData.object_list.header[0]
    },
    methods: {
        async fetchData() {
            try {
                const response = await this.$axios.get('http://localhost:3000/objects/list'); // Adjust this URL to your endpoint
                console.log(response.data.jsonData)
                let resData = response.data.jsonData
                this.tableBody = resData;
            } catch (error) {
                console.error("There was an error fetching the data:", error);
            }
        }
    }



}
</script>

<style lang="scss" scoped></style>