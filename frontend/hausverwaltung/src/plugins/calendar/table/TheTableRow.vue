<!-- TheTableRow.vue -->
<template>
    <section class="flex border-t border-gray-300 hover:bg-gray-100">
        <td v-for="(item, columnIndex) in row" :key="columnIndex" class="flex-1 py-2 px-4">
            {{ Array.isArray(item) ? item.join('\n') : item }}
        </td>
    </section>
</template>
  
<!-- <template>
    <section>
        <tr class="border-t border-gray-300 hover:bg-gray-100">
            <td v-for="(item, columnIndex) in row" :key="columnIndex" class="py-2 px-4">
                {{ Array.isArray(item) ? item.join('\n') : item }}
            </td>
        </tr>
    </section>
</template> -->
<!-- <template>
    <section>
        <tr>
            <td v-for="(item, columnIndex) in row" :key="columnIndex">
                {{ Array.isArray(item) ? item.join('\n') : item }}
            </td>
        </tr>
    </section>
</template> -->

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
// tr {
//     display: flex;
//     justify-content: space-around;
//     align-items: center;

//     td {
//         width: calc(100%/3);
//         overflow: hidden;
//         text-align: center;
//         height: 3rem;
//         font-size: 1rem;
//     }
// }
</style>