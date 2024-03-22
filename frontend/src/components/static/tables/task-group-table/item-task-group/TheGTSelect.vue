<template>
    <section class="flex w-full">
        <label for="groups" class="w-1/4">Select Group:</label>
        <select name="groups" id="groups" class="w-1/2 ml-2" v-model="selectedGroup">
            <optgroup label="List of Groups">
                <option v-for="group in listOfGroupsAndTasks">{{ group.group_name }}</option>
            </optgroup>
        </select>
    </section>
</template>

<script>
export default {
    data() {
        return {
            listOfGroupsAndTasks: {},
            selectedGroup: null,
        }
    },
    watch: {
        selectedGroup(newVal, oldVal) {
            this.$emit('selectedGroup', newVal);
        }
    },
    methods: {
        async listOfGroups() {
            await this.$axios.get(`http://localhost:3000/tg/list_groups`,)
                .then(
                    (res) => {
                        console.log(res.data.message)
                        if (res.data.success) {
                            this.listOfGroupsAndTasks = res.data.message
                        } else {
                            console.log('something went wrong')
                        }
                    }
                )
                .catch(error => console.error('There was an error fetching the objects:', error));
        },

    },
    mounted() {
        // Fetch data when component mounts
        this.listOfGroups();
    },
}
</script>

<style lang="scss" scoped></style>