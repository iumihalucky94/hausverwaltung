<template>
    <section>
        <tr>
            <td v-for="(item, columnIndex) in row" :key="columnIndex">{{ item }}</td>
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

<style lang="scss" scoped></style>