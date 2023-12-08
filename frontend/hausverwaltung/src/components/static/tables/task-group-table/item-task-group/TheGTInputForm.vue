<template>
    <section class="flex flex-col justify-between w-9/12 h-52 mb-6 font-light text-l text-gray-500 ">
        <p class="font-bold text-xl text-secondary mb-2">Please choose what you want to create:</p>
        <TheGTRadio :radioValue="selectValues" @selected="handleSelected" />
        <TheGTSelect v-if="selectedValue === 'Tasks'" :listOfGroupsAndTasks="listOfGT" />
        <TheInputField inputLabel="Name:" inputName="nameInput" @inputValue="someModelValue"
            inputPlaceholder="Group or Task name" />
        <div>
            <TheSaveConfirmButton btnText="Save" />
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
            inputFieldValue: ''
        }
    },
    methods: {
        handleSelected(value) {
            this.selectedValue = value;
            console.log('Selected value in parent component:', value);
            // Do something with the selected value in the parent component
        },
        someModelValue(value) {
            this.inputFieldValue = value;
            console.log(value);
        }
    },
}
</script>

<style lang="scss" scoped></style>