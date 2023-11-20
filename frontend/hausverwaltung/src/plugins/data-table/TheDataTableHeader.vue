<template>
    <tr>
        <th v-for="(value, key) in tableHeaderValue" :key="key">{{ value }}</th>
    </tr>
</template>

<script>
export default {
    props: {
        tableHeader: Object,
        required: true
    },
    data() {
        return {}
    },
    computed: {
        tableHeaderValue() {
            return Object.values(this.tableHeader[0]);
        }
    }
}
</script>

<style lang="scss" scoped></style>
