<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class=" min-w-10/12 min-h-10/11 flex  justify-center items-center">
            <TheSectionHeader headerText="List of Suppliers" />

        </div>
    </section>
</template>

<script>
import TheSectionHeader from '@/components/static/TheSectionHeader.vue';
export default {
    components: {
        TheSectionHeader
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>