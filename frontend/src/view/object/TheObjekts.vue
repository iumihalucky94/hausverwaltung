<template>
    <section class="w-full h-full flex flex-col justify-center align-center items-center">
        <div class="h-10 w-full font-bold text-2xl m-5 flex flex-row justify-center items-center">
            <div class="w-1/3"></div>
            <h1 class="w-1/3 text-center">List of Objects</h1>
            <div class="w-1/3">
                <TheSaveConfirmButton btnText="Create new" routeName="Create_object" />
            </div>
        </div>
        <TheDataTable class="mh-90 mb-10" />
    </section>
</template>

<script>
import TheDataTable from '@/components/static/tables/object-table/TheDataTable.vue';
import TheSaveConfirmButton from '@/components/buttons/TheSaveConfirmButton.vue';

export default {
    components: {
        TheDataTable,
        TheSaveConfirmButton
    },
    data() {
        return {
        }
    },

}
</script>

<style lang="scss" scoped></style>