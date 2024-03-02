<template>
    <section class="flex w-full ">

        <div class="w-full">
            <TheSectionHeader headerText="Updated data" class="text-center mb-10" />
            <div v-for="(field, index) in inputFormsList.create_object" :key="index" class="mb-4 px-2">
                <TheInputField class="text-secondary w-full" :inputLabel="field.inputLabel" :inputName="field.inputName"
                    :inputPlaceholder="field.inputPlaceholder" @input="getDataFromChild" />
            </div>
        </div>
    </section>
</template>


<script>
import TheSectionHeader from '@/components/static/TheSectionHeader.vue';
import TheInputField from '@/components/static/TheInputField.vue';
import TheSaveConfirmButton from '@/components/buttons/TheSaveConfirmButton.vue';
import inputForms from '@/data/inputForms.json'

export default {
    components: {
        TheSectionHeader,
        TheInputField,
        TheSaveConfirmButton,
    },
    data() {
        return {
            inputFormsList: inputForms,
            inputJSON: {},
        }
    },
    methods: {
        getDataFromChild(data) {
            const jsonData = this.inputJSON;
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
            this.inputJSON = { ...jsonData };
            this.$emit('updatedObjectData', this.inputJSON);
        },
    },
}
</script>

<style lang="scss" scoped></style>