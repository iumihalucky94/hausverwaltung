<template>
    <thead class="bg-blue-100 text-center h-10">
        <tr>
            <th v-for="(value, key) in tableHeaderValue" :key="key" class="">{{ value }}
            </th>
        </tr>
    </thead>
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

<style >
thead {
    border-radius: 10px;
}
</style>
