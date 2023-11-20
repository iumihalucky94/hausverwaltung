<template>
    <tr v-for="(row, rowIndex) in tableBody" :key="rowIndex">
        <td v-for="(item, index) in Object.values(row)" :key="index">{{ item }}</td>
    </tr>
    <tr v-if="tableBody.length === 0">
        <td colspan="number_of_columns">No data available</td>
    </tr>
</template>

<script>
export default {
    props: {
        tableBody: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped>
/* Add your styles here */
</style>

<!-- <template>
    <tr v-if="tableRowValue.length > 0">
        <td v-for="(item, index) in tableRowValue" :key="index">{{ item }}</td>
    </tr>
    <tr v-else>
        <td colspan="number_of_columns">No data available</td>
    </tr>
</template>

<script>
export default {
    props: {
        tableBody: Object,
        required: true
    },
    data() {
        return {}
    },
    computed: {
        tableRowValue() {
            return this.tableBody.length > 0 ? Object.values(this.tableBody) : [];
        },
    }
}
</script>

<style lang="scss" scoped></style> -->
