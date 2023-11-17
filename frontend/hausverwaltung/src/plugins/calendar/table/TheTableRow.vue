<template>
    <section class="flex border-t border-gray-300 hover:bg-gray-100">
        <td v-for="(item, columnIndex) in row" :key="columnIndex" class="flex-1 py-2 px-4">
            {{ Array.isArray(item) ? item.join('\n') : item }}
        </td>
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