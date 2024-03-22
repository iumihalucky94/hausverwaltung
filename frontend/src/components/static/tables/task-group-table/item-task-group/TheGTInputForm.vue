<template>
    <section class="flex flex-col justify-between w-9/12 h-52 mb-6 font-light text-l text-gray-500 ">
        <p class="font-bold text-xl text-secondary mb-2">Please choose what you want to create:</p>
        <TheGTRadio :radioValue="selectValues" @selected="handleSelected" />
        <TheGTSelect v-if="selectedValue === 'Tasks'" :listOfGroupsAndTasks="listOfGT" @selectedGroup="handleSelGroup" />
        <TheInputField inputLabel="Name:" inputName="nameInput" inputPlaceholder="Group or Task name"
            @input="getDataFromChild" />
        <div>
            <TheSaveConfirmButton btnText="Save" @click="saveData" />
        </div>
    </section>
</template>

<script>
import TheGTRadio from '@/components/static/tables/task-group-table/item-task-group/TheGTRadio.vue';
import TheGTSelect from '@/components/static/tables/task-group-table/item-task-group/TheGTSelect.vue';
import TheInputField from '@/components/static/TheInputField.vue';
import TheSaveConfirmButton from '@/components/buttons/TheSaveConfirmButton.vue';


export default {
    props: {
        listOfGT: {
            type: Object,
            required: false
        }
    },
    components: {
        TheGTRadio,
        TheGTSelect,
        TheInputField,
        TheSaveConfirmButton
    },
    data() {
        return {
            selectValues: [
                'Groups', 'Tasks'
            ],
            selectedValue: '',
            inputFieldValue: {}
        }
    },
    methods: {
        handleSelected(value) {
            this.selectedValue = value;
            this.inputFieldValue['gt'] = value;
        },
        handleSelGroup(value) {
            this.inputFieldValue['group_name'] = value;
        }
        ,
        getDataFromChild(data) {
            const jsonData = this.inputFieldValue;
            for (let i = 0; i < data.length; i += 2) {
                const key = data[i];
                const value = data[i + 1].trim();
                // Check if the key already exists in the JSON object
                if (jsonData.hasOwnProperty(key)) {
                    // If the key exists, update its value
                    jsonData[key] = value;
                } else {
                    // If the key doesn't exist, add it to the JSON object
                    jsonData[key] = value;
                }
            }
            this.inputFieldValue = { ...jsonData };
        },
        async saveData() {
            let data = this.inputFieldValue

            if ((data.gt === 'Groups' || data.gt === 'Tasks') && Object.keys(data).length > 1) {
                try {
                    await this.$axios.post('http://localhost:3000/tg/create_gt', data, {
                        headers: {
                            // Overwrite Axios's automatically set Content-Type
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        console.log(res)
                        location.reload();
                    }).catch(e => {
                        console.log(e)
                    })
                } catch (error) {
                    console.log('I was trying to send request to DB, but something went wrong', error)
                }
            } else {
                console.error('you didnt select group or task, so it not working or input is empty')
            }
        }
    },
}
</script>

<style lang="scss" scoped></style>