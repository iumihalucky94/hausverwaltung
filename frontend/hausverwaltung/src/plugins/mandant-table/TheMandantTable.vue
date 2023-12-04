<template>
    <table class="w-11/12 ">

        <TheMandantTableHeader :header_data="tableHeaderData" />
        <TheMandantTableRow :group_tasks="groups_tasks" :table_data="tableData" />
    </table>
</template>


<script>

import TheMandantTableHeader from '@/plugins/mandant-table/TheMandantTableHeader.vue';
import TheMandantTableRow from '@/plugins/mandant-table/TheMandantTableRow.vue';
import mandantTableInfo from '@/data/mandantTableInfo.json'
import groupAndTasksList from '@/data/objektgroup.json'
import mandantPlaneData from '@/data/mandantPlaneData.json'

export default {
    components: {
        TheMandantTableRow,
        TheMandantTableHeader
    },
    data() {
        return {
            text: "asd",
            objectIdURL: '',
            tableHeaderData: mandantTableInfo.header,
            groups_tasks: groupAndTasksList,
            tableData: {},
            dataList: ''
        }
    },
    methods: {

    },
    async created() {
        this.objectIdURL = this.$router.currentRoute._rawValue.params.object_id;
        this.tableData = mandantPlaneData[this.objectIdURL];
    }
}
</script>

<style lang="scss" scoped></style>