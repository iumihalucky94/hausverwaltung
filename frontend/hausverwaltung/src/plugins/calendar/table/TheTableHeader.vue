<template>
    <section>
        <tr class="bg-gray-200 uppercase flex align-center ">
            <th v-for="(header, index) in headers" :key="index" class="flex-1 text-center py-2 px-4">{{ header }}</th>
        </tr>
    </section>
</template>
<!-- <template>
    <section>
        <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
    </section>
</template> -->

<script>
export default {
    props: {
        headers: Array,
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

//     th {
//         width: calc(100%/3);
//         overflow: hidden;
//         text-align: center;
//         height: 4rem;
//         font-size: 1.5rem;
//     }


// }
</style>