<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class="w-11/12 h-full mt-6 text-secondary text">
            <div v-for="(group, index, i) in groups_tasks" :key="index" class="w-full mb-6">
                <div class="flex w-full justify-between items-center h-12 p-8 bg-primary border-2 rounded-xl">
                    <p class="text-2xl font-bold">{{ Object.keys(groups_tasks)[i] }}</p>
                    <fai @click="toggleVisibility(index)"
                        :icon="visible[index] ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'" />
                </div>
                <!-- <div v-if="visible[index]" v-for="item in group" :key="item" class="w-11/12 mx-12 text-xl"> -->
                <div v-if="visible[index]" class="w-95% ml-8">
                    <table class=" w-full h-full border-2 border-slate-300">
                        <TheMandantTableHeader :header_data="tableHeaderData" />
                        <TheMandantTableRow :group_tasks="group" />
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>


<script>

import TheMandantTableHeader from '@/plugins/mandant-table/TheMandantTableHeader.vue';
import TheMandantTableRow from '@/plugins/mandant-table/TheMandantTableRow.vue';
import mandantTableInfo from '@/data/mandantTableInfo.json'
import groupAndTasksList from '@/data/objektgroup.json'
import mandantPlaneData from '@/data/mandantPlaneData.json'


export default {
    components: {
        TheMandantTableRow,
        TheMandantTableHeader,
    },
    data() {
        return {
            objectIdURL: '',
            tableHeaderData: mandantTableInfo.header,
            groups_tasks: groupAndTasksList,
            tableData: {},
            visible: {}
        }
    },
    watch: {
        groupAndTasksList() {

        }
    },
    methods: {
        toggleVisibility(index) {
            this.visible[index] = this.visible[index] ? false : true
            console.log(groupAndTasksList)
        },
    },
    watch: {

    },
    async created() {
        this.objectIdURL = await this.$router.currentRoute._rawValue.params;
        this.tableData = mandantPlaneData[this.objectIdURL];

        // console.log(obj)
        for (let key in groupAndTasksList) {
            console.log(this.visible[key])
            this.visible[key] = true
        }
        console.log(this.tableHeaderData)
        console.log(this.visible)
    }
}
</script>

<style lang="scss" scoped></style>