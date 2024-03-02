<template>
    <section class="w-50w h-30h flex items-center justify-center flex-col bg-gray-100/50 rounded-3xl mx-2">
        <TheSectionHeader headerText="Neue Lieferant erstellen" />
        <form class="w-40w flex flex-col justify-between pt-5" @submit.prevent>
            <TheInputField inputName="supplier_name" inputLabel="Lieferant Name:" inputPlaceholder="Fill Lieferant name"
                @input="getDataFromChild" />
            <TheInputField inputName="supplier_email" inputLabel="Lieferant Email:" inputPlaceholder="Fill Lieferant email"
                inputType="email" @input="getDataFromChild" />
            <TheSaveConfirmButton btnText="Neue erstellen" @click="storeData" />
        </form>
    </section>
</template>

<script >
export default {
    data() {
        return {
            inputJSON: {}
        }
    },
    methods: {
        getDataFromChild(data) {
            let jsonData = this.inputJSON;
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
            console.log(jsonData)
        },
        storeData() {
            console.log(2)
        }
    }
}
</script>

<style lang="scss" scoped></style>