<template>
    <tr>
        <th v-for="(item, index) in tableBody" :key="index">{{ item }}</th>
    </tr>
</template>

<script>
export default {
    props: {
        tableBody: Object,
        required: true
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>
