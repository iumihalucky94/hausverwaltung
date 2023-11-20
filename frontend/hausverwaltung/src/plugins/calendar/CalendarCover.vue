<template>
    <section>
        <TheCalendarHeader />
        <TheCalendarMain />
        <!-- <TheCalendarFooter /> -->

    </section>
</template>

<script>
import TheCalendarButton from './buttons/TheCalendarButton.vue';
import TheCalendarFooter from './TheCalendarFooter.vue';
import TheCalendarHeader from './TheCalendarHeader.vue';
import TheCalendarMain from './TheCalendarMain.vue';
export default {
    components: {
        TheCalendarButton,
        TheCalendarHeader,
        TheCalendarMain,
        TheCalendarFooter,
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped></style>