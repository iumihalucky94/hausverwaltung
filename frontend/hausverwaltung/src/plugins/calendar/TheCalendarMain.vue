<template>
    <section>
        <TheTable />
    </section>
</template>

<script>
import TheTable from './table/TheTable.vue';
export default {
    components: { TheTable },

    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
section {
    height: 100%;
    width: 100%;
}
</style>