<template>
    <section>
        <table class="w-full table-fixed ">
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

<style lang="scss" >
// table {
//     width: 100%;
//     height: 100%;
// }
table {
    table-layout: fixed;
}

th,
td {
    width: calc(100% / 9);
    overflow-wrap: break-word;
    /* Assuming 9 columns based on your listOfHeader */
}

/* Set equal width for each column (adjust as needed) */
</style>