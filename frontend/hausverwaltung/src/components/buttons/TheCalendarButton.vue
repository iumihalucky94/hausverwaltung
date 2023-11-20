<template>
    <!-- <button :style="buttonStyle, buttonWidth">{{ buttonText }}</button> -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded-full">{{ buttonText }}</button>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true,
        },
        buttonColor: {
            type: String,
            default: 'rgb(128, 195, 217)', // Set a default color if not provided by the parent
        },
        buttonWidth: {
            type: String,
            default: '4rem', // Set a default color if not provided by the parent
        },
    },
    computed: {
        buttonStyle() {
            return {
            };
        },
        buttonStyle() {
            return {
                width: this.buttonWidth
            };
        },
    },
    components: {},
    data() {
        return {
            // buttonColor: '',
        }
    },

}
</script>

<style lang="scss" scoped></style>