<template>
    <thead>
        <tr class="h-14 font-sans font-light border-2 border-slate-400">
            <th v-for="item in header_data" :key="item.belongs" :id="item.belongs" class="border-2 border-slate-400">
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