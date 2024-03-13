<template>
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
        <tr>
            <th scope="col" class="px-6 py-3 text-center bg-primary">Name <span v-if="sortColumn === 'name'">{{ sortOrder
                === 'asc' ? '↑' : '↓' }}</span></th>
            <th scope="col" class="px-6 py-3 text-center bg-primary">Email</th>
            <th scope="col" class="px-6 py-3 text-center bg-primary">Status</th>
            <th scope="col" class="px-6 py-3 text-center bg-primary">Created</th>
        </tr>
    </thead>
</template>

<script>
export default {
    components: {

    },
    props: {
        sortColumn: String,
        sortOrder: String // 'asc' or 'desc'
    },
    data() {
        return {

        }
    },
    methods: {
        emitSort(column) {
            this.$emit('update:sort', column);
        }
    },
    mounted() {

    }
}
</script>

<style scoped></style>