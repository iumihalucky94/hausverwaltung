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

<style lang="scss" scoped>
tr {
    display: flex;
    justify-content: space-around;
    align-items: center;

    th {
        width: calc(100%/3);
        overflow: hidden;
        text-align: center;
        height: 4rem;
        font-size: 1.5rem;
    }


}
</style>