<template>
    <div class="flex justify-between w-1/2">
        <label :for="value" v-for="value in radioValue" :key="value">
            {{ value }}
            <input type="radio" :id="value" :value="value" name="radioGroup" v-model="selectedValue">
        </label>
    </div>
</template>

<script>
export default {
    props: {
        radioValue: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedValue: null,
        };
    },
    watch: {
        selectedValue(newValue) {
            this.$emit('selected', newValue);
        },
    },
};
</script>

<style lang="scss" scoped></style>
