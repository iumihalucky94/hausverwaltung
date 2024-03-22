<template>
    <section class="flex w-full ">
        <div v-if="!loading">
            <div class="w-full">
                <TheSectionHeader headerText="Current data" class="text-center mb-10" />
                <div v-for="(field, index) in inputFormsList.create_object" :key="index" class=" mb-4 px-2 ">
                    <TheInputField class="text-secondary w-full" :inputLabel="field.inputLabel" :inputName="field.inputName"
                        :inputPlaceholder="field.inputPlaceholder" :disable_validated="true"
                        :passedInputValue="dataList[field.inputName]" />
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading ...</p>
        </div>
    </section>
</template>

<script>
import TheSectionHeader from '@/components/static/TheSectionHeader.vue';
import TheInputField from '@/components/static/TheInputField.vue';
import inputFormsData from '@/data/tableData.json';
import inputForms from '@/data/inputForms.json'

export default {
    components: {
        TheSectionHeader,
        TheInputField,

    },
    data() {
        return {
            inputFormsList: inputForms,
            dataList: inputFormsData,
            objectIdURL: '',
            objects: [],
            loading: true,
        }
    },
    methods: {
        getDesiredObjectFromJSONByID(id) {
            console.log(inputFormsData.object_list)
            return inputFormsData.object_list.body.filter(object => object.object_id === id);
        },
        async fetchData() {
            this.objectIdURL = this.$router.currentRoute._rawValue.params.object_id
            await this.$axios.get(`http://localhost:3000/objects/get_data/${this.objectIdURL}`,)
                // .then(response => response.json())
                .then(
                    (res) => {
                        console.log(res.data.message)
                        this.dataList = res.data.message
                        this.loading = false;
                        this.$emit('currentData', this.dataList);
                    }
                )
                .catch(error => console.error('There was an error fetching the objects:', error));
        }
    },
    mounted() {
        // Fetch data when component mounts
        this.fetchData();
    },
}
</script>
