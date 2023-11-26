<template>
    <section class="w-full h-90 flex flex-col justify-center items-center">
        <form @submit.prevent
            class="w-1/2 h-2/3 px-32 border-solid border-2 bg-primary rounded-3xl flex justify-center items-center flex-col">
            <TheSectionHeader headerText="Create new Object" class="text-center mb-10" />
            <div v-for="(field, index) in inputFormsList.create_object" :key="index" class="w-full">
                <TheInputField class="text-secondary" :inputLabel="field.inputLabel" :inputName="field.inputName"
                    :inputPlaceholder="field.inputPlaceholder" :isRequired="field.isRequired" @input="getDataFromChild" />
            </div>
            <TheSaveConfirmButton btnText="Create new flat" :navigate="false" class="mt-10" @click="storeData" />
        </form>
    </section>
</template>

<script>
import TheSectionHeader from '@/components/static/TheSectionHeader.vue';
import TheInputField from '@/components/static/TheInputField.vue';
import TheSaveConfirmButton from '@/components/buttons/TheSaveConfirmButton.vue';
import inputFormsList from '@/data/inputForms.json';

import { updateMissingKeys, checkRequiredFields } from '@/utils/formUtils';

export default {
    components: {
        TheSectionHeader,
        TheInputField,
        TheSaveConfirmButton,
    },
    data() {
        return {
            inputFormsList: inputFormsList,
            inputJSON: {}
        };
    },
    methods: {
        getDataFromChild(data) {
            const jsonData = this.inputJSON;
            for (let i = 0; i < data.length; i += 2) {
                const key = data[i];
                const value = data[i + 1];
                // Check if the key already exists in the JSON object
                if (jsonData.hasOwnProperty(key)) {
                    // If the key exists, update its value
                    jsonData[key] = value;
                } else {
                    // If the key doesn't exist, add it to the JSON object
                    jsonData[key] = value;
                }
            }
        },
        storeData() {
            const propertyName = 'create_object';
            updateMissingKeys(this.inputJSON, this.inputFormsList, propertyName);
            const jsonChecker = checkRequiredFields(this.inputJSON, this.inputFormsList, propertyName);

            if (jsonChecker === true) {
                console.log('clicked')
                console.log(this.inputJSON)
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>