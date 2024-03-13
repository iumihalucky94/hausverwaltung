<template>
    <section class="w-full h-full flex justify-center items-center flex-col">
        <div class="w-5/6 h-full pt-5 flex justify-center items-center flex-col">
            <TheSectionHeader headerText="Lieferant Liste" />
            <TheSaveConfirmButton btnText="Create new!" :navigate="true" routeName="create_supplier" class="pt-4" />
        </div>
        <div class="felx justify-center items-center w-80w h-70h pt-10">
            <TheSupplierTable />
        </div>
    </section>
</template>

<script>

import TheSaveConfirmButton from '../../components/buttons/TheSaveConfirmButton.vue'
import TheSupplierTable from '@components/static/tables/supplier/list_table/TheSupplierTable.vue'


export default {
    components: {
        TheSaveConfirmButton,
        TheSupplierTable

    },
    data() {
        return {
            desiredHeader: 'supplier'
        }
    },
    methods: {
        dataChecker() {
            console.log(1)
        },
    },
    computed: {
    },
    mounted() {
        // this.dataChecker
    }
}
</script>

<style lang="scss" scoped></style>