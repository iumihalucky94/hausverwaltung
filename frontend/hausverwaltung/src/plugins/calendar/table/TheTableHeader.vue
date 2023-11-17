<template>
    <section>
        <tr class="bg-blue-500 uppercase flex ">
            <th v-for="(header, index) in headers" :key="index" class="flex-1 text-left py-2 px-4 text-white">{{
                header }}</th>
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