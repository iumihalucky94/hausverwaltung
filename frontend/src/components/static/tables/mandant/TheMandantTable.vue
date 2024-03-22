<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class="w-full h-full mt-6 text-secondary text pl-2 pr-2">
            <div v-for="(tasks, groupName, index) in groupsAndTasks" :key="groupName" class="w-full mb-6">
                <div class="flex w-full justify-between items-center h-12 p-8 bg-primary border-2 rounded-xl">
                    <p class="text-2xl font-bold">{{ groupName }}</p>
                    <fai @click="toggleVisibility(index)"
                        :icon="visible[index] ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'" />
                </div>
                <div v-if="visible[index]" class="w-full pl-2 pr-2">
                    <table class="w-full h-full border-2 border-slate-300">
                        <TheMandantTableHeader :header_data="tableHeaderData" />
                        <TheMandantTableRow :group_tasks="tasks" :group_name="groupName" />
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { reactive, toRefs } from 'vue'; // Import reactive and toRefs
import TheMandantTableHeader from '@/components/static/tables/mandant/TheMandantTableHeader.vue';
import TheMandantTableRow from '@/components/static/tables/mandant/TheMandantTableRow.vue';
import mandantTableInfo from '@/data/mandantTableInfo.json';

export default {
    components: {
        TheMandantTableHeader,
        TheMandantTableRow,
    },
    data() {
        return {
            tableHeaderData: mandantTableInfo.header,
            groupsAndTasks: {},
            visible: reactive({}), // Initialize visible as a reactive object
        }
    },
    methods: {
        async fetchGroupsAndTasks() {
            await this.$axios.get('http://localhost:3000/tg/list')
                .then(response => {
                    this.groupsAndTasks = response.data.message;
                    // Initialize visibility state for each group
                    Object.keys(this.groupsAndTasks).forEach(key => {
                        this.visible[key] = false; // Use the group name as a key
                    });
                })
                .catch(error => console.error('Error fetching tasks:', error));
        },
        toggleVisibility(groupName) {
            this.visible[groupName] = !this.visible[groupName];
        },
    },
    async mounted() {
        this.fetchGroupsAndTasks();
    }
}
</script>