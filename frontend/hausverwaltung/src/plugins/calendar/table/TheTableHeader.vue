<template>
    <section>
        <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
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