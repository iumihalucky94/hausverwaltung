<template>
    <div class="my-3">
        <label :for="inputName" class="" :class="{ 'required': isRequired }">{{ inputLabel }}</label>
        <input :id="inputName" v-model="inputValue" @input="handleInput"
            class="peer ml-2 float-right w-2/3 border-b border-blue-gray-200 bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all  focus:border-thirdly focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            :placeholder="inputPlaceholder" :type="inputType" :required="isRequired ? true : null" />
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
    },
    data() {
        return {
            inputValue: this.value,
        };
    },
    methods: {
        handleInput() {
            this.$emit('input', [this.inputName, this.inputValue]);
        },
    },
};
</script>
