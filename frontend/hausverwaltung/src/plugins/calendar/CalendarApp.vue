<template>
    <section>
        <!-- <div class="left">
            left
        </div> -->
        <div class="right">
            <CalendarCover />
        </div>

    </section>
</template>

<script>
import CalendarCover from './CalendarCover.vue';
export default {
    components: {
        CalendarCover
    }
}
</script>

<style lang="scss" scoped>
section {
    width: 100vw;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid green;

    // .left {
    //     width: 20vw;
    //     height: 100%;
    //     border: 1px solid blue;
    // }

    .right {
        display: flex;
        width: 100vw;
        height: 100%;
        // border: 1px solid rgb(120, 156, 255);
    }
}
</style>