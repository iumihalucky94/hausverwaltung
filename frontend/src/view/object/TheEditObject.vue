<template>
    <section class="flex flex-col">

        <div class="h-10 w-90 font-bold text-2xl m-5 flex flex-row justify-center items-center">
            <div class="w-1/3"></div>
            <h1 class="w-1/3 text-center text-thirdly">Edit House Details</h1>
            <div class="w-1/3"></div>
        </div>
        <div class="w-full flex min-h-70vh">
            <form @submit.prevent class="px-16 flex w-full h-full flex-col">
                <div class="flex flex-col  border-thirdly border-2 rounded-3xl bg-primary py-14">
                    <div class="w-full flex justify-around">
                        <div class="w-1/3">
                            <TheEditCurrentData @currentData="getCurrentDataJSON" />
                        </div>
                        <div class="w-1/3">
                            <TheEditUpdateData @updatedObjectData="getDataFromChild" />
                        </div>
                    </div>
                    <div>
                        <TheSaveConfirmButton btnText="Update Form" @click="storeData" />
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

import TheSaveConfirmButton from '@/components/buttons/TheSaveConfirmButton.vue';
// import inputFormsData from '@/data/data.json';
// import inputForms from '@/data/inputForms.json'
import TheEditCurrentData from './TheEditCurrentData.vue'
import TheEditUpdateData from './TheEditUpdateData.vue'

import { updateValuesFromB } from '@/utils/formUtils';



export default {
    components: {
        TheSaveConfirmButton,
        TheEditCurrentData,
        TheEditUpdateData
    },
    data() {
        return {
            updatedJSON: {},
            currentJSON: {},
        }
    },
    methods: {
        getDataFromChild(data) {
            const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
                // Check for empty string, but you might add additional checks here
                if (value !== '' && value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});
            this.updatedJSON = { ...filteredData };
            console.log(filteredData)
        },
        getCurrentDataJSON(data) {
            this.currentJSON = data;
        },
        async storeData() {
            let updatedData = updateValuesFromB(this.currentJSON, this.updatedJSON);
            if (updatedData === 1) {
                console.error('No changes required, they are equal')
                return
            } else if (updatedData === 2) {
                console.error('No data for update')
                return
            } else {
                console.log('Data will be save: ', updatedData)
                await this.$axios.put('http://localhost:3000/objects/update', updatedData, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>