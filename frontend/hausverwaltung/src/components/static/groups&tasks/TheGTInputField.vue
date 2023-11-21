<template>
    <div>
        <label :for="inputName">{{ inputLabel }}</label>
        <input :id="inputName" v-model="inputValue" @input="handleInput" class="
            peer w-2/3 ml-3 border-b border-blue-gray-200 bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all  focus:border-thirdly focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50
            " placeholder="Input field" />
    </div>
</template>

<script>
export default {
    props: {
        inputLabel: {
            type: String,
            required: true
        },
        inputName: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            inputValue: this.value
        };
    },
    methods: {
        handleInput() {
            this.$emit('inputValue', this.inputValue);
        }
    }
};
</script>

<style scoped>
/* Your styling here */
</style>
