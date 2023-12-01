<template>
    <div class="my-3 w-full">
        <label :for="inputName" class="" :class="{ 'required': isRequired }">{{ inputLabel }}</label>
        <input v-if="!disable_validated" :id="inputName" v-model="inputValue" @input="handleInput"
            class="right peer ml-2 float-right w-2/3 border-b border-blue-gray-200 bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all  focus:border-thirdly focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 disabled:text-slate-500 disabled:font-bold "
            :placeholder="inputPlaceholder" :type="inputType" :required="isRequired ? true : null"
            :disabled="disable_validated" />
        <span v-else :id="inputName" class="text-gray-800">{{ passedInputValue }}</span>
        <span v-if="isRequired" class="text-red-500">*</span>
    </div>
</template>

<script>
export default {
    props: {
        inputLabel: {
            type: String,
            required: true,
        },
        inputName: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Number],
            default: '',
        },
        inputPlaceholder: {
            type: String,
            default: 'Feel input',
        },
        inputType: {
            type: String,
            default: 'text',
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        disable_validated: {
            type: Boolean,
            default: false
        },
        passedInputValue: {
            type: [String, Number],

        }
    },
    data() {
        return {
            inputValue: this.passedInputValue,
            lableWidth: "minw-1/4"
        };
    },
    methods: {
        handleInput() {
            this.$emit('input', [this.inputName, this.inputValue]);
        },
    },
};
</script>
