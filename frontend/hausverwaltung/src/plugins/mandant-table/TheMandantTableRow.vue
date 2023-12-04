<template>
    <tbody>
        <tr v-for="item, index in group_tasks" :key="index" class="border-2 border-amber-600">
            <td>
                <p class="font-bold text-thirdly ">{{ item[0] }}</p>

        <tr v-for=" task, task_index in item" :key="task_index">

            <p class="bg-slate-200 w-full">{{ task }}</p>


        </tr>
        </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        group_tasks: {
            required: true
        },
        table_data: {
            required: false
        }
    }
    ,
    data() {
        return {}
    },
    created() {
        console.log(this.table_data)
    }
}
</script>

<style lang="scss" scoped></style>