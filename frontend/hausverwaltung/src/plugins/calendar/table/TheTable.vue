<template>
    <section>
        <TheTableHeader />
        <TheTableRow />
    </section>
</template>

<script>
import TheTableHeader from './TheTableHeader.vue';
import TheTableRow from './TheTableRow.vue';

export default {
    components: {
        TheTableHeader,
        TheTableRow
    },
    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>