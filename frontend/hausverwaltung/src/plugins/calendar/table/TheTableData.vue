<template>
    <section>
        <TheTableHeader :headers="listOfHeader" />
        <TheTableRow v-for="(row, index) in listOfRows" :key="index" :row="row" />
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
        return {
            listOfHeader: ['Name', 'Address', 'SomeMore'],
            listOfRows: [
                ['johan', 'Some address#1', 'Comment #6'],
                ['Alex', 'Some address#2', 'Comment #4 Comment #4Comment #4Comment #4Comment #4Comment #4Comment #4Comment #4'],
                ['Samata', 'Some address#3', 'Comment #5']
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
tr {
    display: flex;
    justify-content: space-around;
    align-items: center;

    th,
    td {
        width: calc(100%/3);
        overflow: hidden;
        text-align: center;
    }

    th {
        height: 4rem;
        font-size: 2rem;
    }

    td {
        height: 3rem;
        font-size: 1.3rem;
    }
}
</style>