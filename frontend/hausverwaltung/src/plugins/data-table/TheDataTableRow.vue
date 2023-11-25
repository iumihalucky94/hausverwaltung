<template>
    <tbody class="border-b text-center divide-y">
        <tr v-for="(row, rowIndex) in tableBody" :key="rowIndex" class="h-14 hover:bg-neutral-100 ease-in-out duration-200">
            <td v-for="(item, index) in Object.values(row)" :key="index" class="">{{ item }}</td>
            <td class="h-14 w-full flex flex-row justify-center items-center">
                <button @click="handleButtonClick(row['id'])"
                    class="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center hover:bg-green-600">
                    <fai icon="fa-solid fa-house" class="text-white" />
                </button>
                <button @click="handleButtonClick(row['object_id'])"
                    class="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 ml-2">
                    <fai icon="fa-solid fa-list-check" class="text-white" />
                </button>
            </td>
        </tr>
        <tr v-if="tableBody.length === 0">
            <td :colspan="tableBody.length || 1">No data available</td>
        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        tableBody: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        handleButtonClick(value) {
            // Do something with the value (id or object_id)
            console.log(`Button clicked with value: ${value}`);
        },
    },
};
</script>

<style lang="scss" scoped></style>
