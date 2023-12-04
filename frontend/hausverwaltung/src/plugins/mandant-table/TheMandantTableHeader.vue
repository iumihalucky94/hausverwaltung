<template>
    <thead>
        <tr>
            <th v-for="item in header_data" :key="item.belongs" :id="item.belongs">
                {{ item.name }}
            </th>
        </tr>
    </thead>
</template>

<script>

export default {
    props: {
        header_data: {
            required: true
        }
    },
    data() {
        return {
            dataList: {}
        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped></style>