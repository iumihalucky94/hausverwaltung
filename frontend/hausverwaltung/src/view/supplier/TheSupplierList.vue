<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class=" min-w-10/12 min-h-10/11 flex  justify-center items-center">
            <!-- <TheSectionHeader headerText="List of Suppliers" /> -->
            <p @click="dataChecker">111111</p>
            <!-- <TheDefaulTableHeader :tableHeader="tableHeaderValue" /> -->
        </div>
    </section>
</template>

<script>
import tableData from '@/data/inputForms.json'

export default {
    components: {
        // TheSectionHeader,

    },
    data() {
        return {
            desiredHeader: 'supplier'
        }
    },
    methods: {
        dataChecker() {
            console.log(1)
        }
    },
    computed: {
    },
    mounted() {
        this.dataChecker
    }
}
</script>

<style lang="scss" scoped></style>