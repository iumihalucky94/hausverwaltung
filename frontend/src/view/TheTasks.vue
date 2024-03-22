<template>
    <section class="w-full h-full flex px-24 my-10">
        <div class="w-full h-full flex justify-center items-center flex-col bg-gray-100/50 rounded-3xl mx-2">
            <p class="text-2xl underline text-thirdly my-4">List of Groups and Tasks</p>
            <!-- <TheGT :groupsAndTasks="data" /> -->
            <TheGT />
        </div>
        <div class="w-full h-full flex justify-center items-center flex-col bg-gray-100/50 rounded-3xl mx-2">
            <p class="text-2xl underline text-thirdly my-4">Create new task or group</p>
            <TheGTInputForm :listOfGT="groupKeys" />
        </div>
    </section>
</template>

<script>
import groupsTasks from '@/data/objektgroup.json'
import TheGT from '@/components/static/tables/task-group-table/item-task-group/TheGT.vue';
import TheGTInputForm from '@/components/static/tables/task-group-table/item-task-group/TheGTInputForm.vue'

export default {
    components: {
        TheGT,
        TheGTInputForm
    },
    data() {
        const data = groupsTasks;
        const groupKeys = Object.keys(data);

        return {
            data,
            groupKeys
        };
    },
    methods: {
        refreshGTData() {
            console.log('here')
        }
    }

}
</script>

<style lang="scss" scoped></style>