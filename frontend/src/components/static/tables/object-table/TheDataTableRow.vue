<template>
    <tbody class="border-b text-center divide-y">
        <tr v-for="(row, rowIndex) in tableBody" :key="rowIndex" class="h-14 hover:bg-neutral-100 ease-in-out duration-200">
            <td v-for="(item, index) in Object.values(row)" :key="index" class="">{{ item }}</td>
            <td class="h-14 w-full flex flex-row justify-center items-center">
                <router-link :to="'/objects/edit/' + row['object_id']">
                    <button class="w-8 h-8 bg-thirdly rounded-xl flex items-center justify-center hover:bg-green-600">
                        <fai icon="fa-solid fa-house" class="text-white" />
                    </button>
                </router-link>
                <router-link :to="'/mandant/edit/' + row['object_id']">
                    <button class="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-700 ml-2">
                        <fai icon="fa-solid fa-list-check" class="text-white" />
                    </button>
                </router-link>
                <button class="w-8 h-8 bg-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-800 ml-2"
                    @click="deleteItem(row)" :showModal="true">
                    <fai icon="fa-solid fa-trash" class="text-white" />
                </button>
            </td>
        </tr>
        <tr v-if="tableBody.length === 0">
            <td :colspan="tableBody.length || 1">No data available</td>
        </tr>

    </tbody>
    <TheDeleteModal :showModal="showDeleteModalWindow" @closeWindow="closeModal" @confirmWindow="confirmModal"
        :modalWindowText="deleteWindowText" />
</template>

<script>

export default {
    props: {
        tableBody: {
            type: Object,
            default: () => [],
        },
    },
    components: {
    },

    data() {
        return {
            showDeleteModalWindow: false,
            deleteWindowText: {
                modalText: "Delete Record",
                hintText: "This action will destroy all relationships",
                cancelText: "Cancel",
                confirmText: "Confirm"
            },
            delete_id: ''
        }
    },
    methods: {
        deleteItem(row) {
            console.log(row.object_id)
            this.delete_id = row.object_id
            this.showDeleteModalWindow = true
        },
        closeModal() {
            this.showDeleteModalWindow = false
            this.delete_id = ''
            console.log()
        },
        async confirmModal(data) {
            // Modal Window confirmation hang in "data"var
            if (data[0]) {
                console.log(this.delete_id)
                let deleteData = {
                    toBeDeleted: true,
                    object_id: this.delete_id
                };
                try {
                    await this.$axios.post('http://localhost:3000/objects/delete/', deleteData, {
                        headers: {
                            // Overwrite Axios's automatically set Content-Type
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(
                            (res) => {
                                if (res.data.success) {
                                    console.log(res.data.message)
                                    // Removing record from local array
                                    let desiredObjectIndex = Object.values(this.tableBody).findIndex(obj => obj.object_id === this.delete_id);
                                    if (desiredObjectIndex !== -1) {
                                        this.tableBody.splice(desiredObjectIndex, 1);
                                    }
                                }
                            }
                        )
                        .catch(
                            (e) => {
                                console.log(e)
                            }
                        )
                } catch (error) {
                    console.log(e)
                }
            }
            this.showDeleteModalWindow = false
            this.delete_id = ''
        }
    },

};
</script>

<style lang="scss" scoped></style>
