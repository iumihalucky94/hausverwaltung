<template>
    <section>
        <tr class="bg-gray-200 uppercase flex align-center ">
            <th v-for="(header, index) in headers" :key="index" class="flex-1 text-center py-2 px-4">{{ header }}</th>
        </tr>
    </section>
</template>

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

<style lang="scss" scoped></style>