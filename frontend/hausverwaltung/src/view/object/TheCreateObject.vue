<template>
    <section class="w-full h-90 flex flex-col justify-center items-center">
        <form @submit.prevent
            class="w-1/2 h-2/3 px-32 border-solid border-2 bg-primary rounded-3xl flex justify-center items-center flex-col">
            <TheSectionHeader headerText="Create new Object" class="text-center mb-10" />

            <div v-for="(field, index) in inputFormsList.create_object" :key="index" class="w-full">
                <TheInputField class="text-secondary" :inputLabel="field.inputLabel" :inputName="field.inputName"
                    :inputPlaceholder="field.inputPlaceholder" :isRequired="field.isRequired" v-model="field.inputValue" />
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

export default {
    components: {
        TheSectionHeader,
        TheInputField,
        TheSaveConfirmButton,
    },
    data() {
        return {
            inputFormsList: inputFormsList,
        };
    },
    methods: {
        storeData() {
            const formData = {};
            this.inputFormsList.create_object.forEach(field => {
                formData[field.inputName] = field.inputValue;
            });
            console.log('User input data:', formData);
        }
    }
};
</script>

<style lang="scss" scoped></style>


<!-- <template>
    <section class="w-full h-90 flex flex-col justify-center items-center">
        <form @submit.prevent
            class="w-1/2 h-2/3 px-32 border-solid border-2 bg-primary rounded-3xl flex justify-center items-center flex-col">

            <TheSectionHeader headerText="Create new Object" class="text-center mb-10" />

            <div v-for="(field, index) in inputFormsList.create_object" :key="index" class="w-full">
                <TheInputField class="text-secondary" :inputLabel="field.inputLabel" :inputName="field.inputName"
                    :inputPlaceholder="field.inputPlaceholder" :isRequired="field.isRequired" />
            </div>

            <TheSaveConfirmButton btnText="Create new flat" :navigate="false" class="mt-10" @click="storeData" />
        </form>
    </section>
</template>

<script>
import TheSectionHeader from '@/components/static/TheSectionHeader.vue';
import TheInputField from '@/components/static/TheInputField.vue';
import TheSaveConfirmButton from '@/components/buttons/TheSaveConfirmButton.vue';
import inputFormsList from '@/data/inputForms.json'

export default {
    components: {
        TheSectionHeader,
        TheInputField,
        TheSaveConfirmButton,
    },
    data() {
        return {
            inputFormsList: inputFormsList,
        };
    },
    methods: {
        storeData() {
            console.log(2)
            console.log(this.inputValue)
        }
    }
};
</script>

<style lang="scss" scoped></style> -->
