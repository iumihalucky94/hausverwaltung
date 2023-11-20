<template>
    <section>
        <ul>
            <li v-for="(tasks, group) in groupsAndTasks" :key="group" class="font-bold text-xl text-secondary">
                {{ group }}
                <ul>
                    <li v-for="task in tasks" :key="task" class="font-light text-l text-gray-500 ml-10 list-disc">{{ task }}
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        groupsAndTasks: {
            type: Object,
            required: true
        }
    },
    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>