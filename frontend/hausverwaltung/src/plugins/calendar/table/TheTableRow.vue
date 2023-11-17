<template>
    <section>
        <tr>
            <td v-for="(item, columnIndex) in row" :key="columnIndex">
                {{ Array.isArray(item) ? item.join('\n') : item }}
            </td>
        </tr>
    </section>
</template>

<script>
export default {
    props: {
        row: Array,
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
tr {
    display: flex;
    justify-content: space-around;
    align-items: center;

    td {
        width: calc(100%/3);
        overflow: hidden;
        text-align: center;
        height: 3rem;
        font-size: 1rem;
    }
}
</style>