<template>
    <section>
        <table class="w-full table-fixed ">
            <TheTableData />
        </table>
    </section>
</template>

<script>

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

<style lang="scss" >
table {
    table-layout: fixed;
}

th,
td {
    width: calc(100% / 9);
    overflow-wrap: break-word;
}
</style>