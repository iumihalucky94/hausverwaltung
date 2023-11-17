<template>
    <section>
        <table>
            <TheTableData />
        </table>
    </section>
</template>

<script>
// import TheTableHeader from './TheTableHeader.vue';
import TheTableData from './TheTableData.vue';

export default {
    components: {
        TheTableData,
    },
    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    height: 100%;
}
</style>