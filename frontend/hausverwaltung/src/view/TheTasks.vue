<template>
    <section class="w-full h-full flex px-24">
        <div class="w-full h-full flex justify-center items-center flex-col">
            <p class="text-2xl underline text-thirdly">List of Groups and Tasks</p>
            <TheGT :groupsAndTasks="data" />
        </div>
        <div class="w-full h-full flex justify-center items-center">
            Create new task or group
        </div>
    </section>
</template>

<script>
import groupsTasks from './objektgroup.json'
import TheGT from '../components/static/groups&tasks/TheGT.vue';
export default {
    components: {
        TheGT
    },
    data() {
        return {
            data: groupsTasks
        }
    }
}
</script>

<style lang="scss" scoped></style>