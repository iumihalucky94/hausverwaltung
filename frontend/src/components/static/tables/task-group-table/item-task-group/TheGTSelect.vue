<template>
    <section class="flex w-full">
        <label for="groups" class="w-1/4">Select Group:</label>
        <select name="groups" id="groups" class="w-1/2 ml-2">
            <optgroup label="List of Groups">
                <option v-for="group in listOfGroupsAndTasks" value="">{{ group }}</option>
            </optgroup>
        </select>
    </section>
</template>

<script>
export default {
    props: {
        listOfGroupsAndTasks: {
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