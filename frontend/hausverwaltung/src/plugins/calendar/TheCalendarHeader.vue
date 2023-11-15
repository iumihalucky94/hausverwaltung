<template>
    <section>
        <div class="left">

        </div>
        <div class="right">
            <TheCalendarButton buttonText="Day" buttonColor="rgb(128, 195, 217)" />
            <TheCalendarButton buttonText="Week" />
            <TheCalendarButton buttonText="Month" />
        </div>
    </section>
</template>

<script>
import TheCalendarButton from './buttons/TheCalendarButton.vue';
export default {
    components: {
        TheCalendarButton
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
}
</style>