<template>
    <tbody>
        <tr v-for="supplier in suppliers " class="bg-white border-b  hover:bg-gray-50 ">
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{{ supplier.name }}
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{{ supplier.email }}
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                <span :class="{ 'text-green': supplier.status === 'active', 'text-red': supplier.status !== 'active' }">{{
                    supplier.status.toUpperCase().slice(0, 1) + supplier.status.slice(1) }}</span>
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{{
                supplier.date_created.slice(0, 10) }}</td>
        </tr>
    </tbody>
</template>

<script>
export default {
    components: {

    },
    props: {
        suppliers: Object
    }
    ,
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        console.log(this.suppliers);
    }
}
</script>

<style scoped>
.text-green {
    color: green;
}

.text-red {
    color: red;
}
</style>