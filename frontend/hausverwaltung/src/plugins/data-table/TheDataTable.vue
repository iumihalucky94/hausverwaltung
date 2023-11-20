<template>
    <section>
        <table>
            <TheDataTableHeader />
            <TheDataTableRow />
        </table>
    </section>
</template>

<script>
import TheDataTableHeader from './TheDataTableHeader.vue'
import TheDataTableRow from './TheDataTableRow.vue'

export default {
    components: {
        TheDataTableHeader,
        TheDataTableRow
    },
    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>