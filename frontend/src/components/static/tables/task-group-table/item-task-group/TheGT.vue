<template>
    <section>
        <ul v-if="Object.keys(groupsAndTasks).length > 0" class="mb-10">
            <li v-for="(tasks, group) in groupsAndTasks" :key="group" class="font-bold text-xl text-secondary mb-2">
                {{ group }}
                <ul>
                    <li v-for="task in tasks" :key="task" class="font-light text-l text-gray-500 ml-10 list-disc">{{ task }}
                    </li>
                </ul>
            </li>
        </ul>
        <h1 v-else>Something went wrong with network connection</h1>
    </section>
</template>

<script>
export default {
    data() {
        return {
            groupsAndTasks: {},
        }
    },
    expose: ['fetchGroupsAndTasks']
    ,
    methods: {
        async fetchGroupsAndTasks() {
            await this.$axios.get('http://localhost:3000/tg/list') // Adjust the URL as needed
                .then(response => {
                    this.groupsAndTasks = response.data.message
                    console.log(this.groupsAndTasks)
                })
                .catch(error => console.error('Error fetching tasks:', error));
        }
    }
    ,
    async mounted() {
        this.fetchGroupsAndTasks();
    }
}
</script>

<style lang="scss" scoped></style>