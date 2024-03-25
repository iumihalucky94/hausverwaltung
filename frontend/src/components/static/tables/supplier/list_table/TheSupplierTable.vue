<template>
    <section class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <TheSupplierTableHeader :sortColumn="sortColumn" :sortOrder="sortOrder" @update:sort="updateSort" />
            <TheSupplierTableRow v-if="suppliers" :suppliers="suppliers" />
            <h1 v-else>Oh no 😢 something went wrong, table is empty, or not able to get data from Data base</h1>
        </table>
    </section>
</template>

<script>

import TheSupplierTableHeader from './TheSupplierTableHeader.vue';
import TheSupplierTableRow from './TheSupplierTableRow.vue';

export default {
    components: {
        TheSupplierTableHeader,
        TheSupplierTableRow
    },
    data() {
        return {
            suppliers: {},
            sortColumn: null,
            sortOrder: 'asc' // or 'desc'
        }
    },
    methods: {
        async getData() {
            try {
                await this.$axios.get('http://localhost:3000/supplier/get_list')
                    .then((res) => {
                        if (res.data.success) {
                            this.suppliers = res.data.message;
                        } else {
                            console.error(response.data.message)
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            } catch (error) {
                this.suppliers = false
                console.error(error);
            }
        },
        updateSort(column) {
            if (this.sortColumn === column) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortOrder = 'asc';
            }
            this.sortData();
        },
        sortData() {
            this.suppliers.sort((a, b) => {
                let valA = a[this.sortColumn], valB = b[this.sortColumn];
                if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

    },
    mounted() {
        this.getData();
    }
}
</script>

<style scoped></style>