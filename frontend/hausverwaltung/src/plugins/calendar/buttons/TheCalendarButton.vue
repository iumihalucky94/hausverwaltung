<template>
    <button :style="buttonStyle, buttonWidth">{{ buttonText }}</button>
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
                // background: this.buttonColor,
                // background: this.buttonColor,
                // Add other button styles here
            };
        },
        buttonStyle() {
            return {
                width: this.buttonWidth
                // background: this.buttonColor,
                // Add other button styles here
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

<style lang="scss" scoped>
button {
    min-width: 4rem;
    width: min-content;
    max-width: calc(100% - 10rem);
    height: 2.5rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: rgb(128, 195, 217);
    border: 0;
    border-radius: 12px;
    transition: 0.3s all ease-in-out;


    &:hover {
        // background: mix(black, #{$buttonColor}, 10%);
        // background: darken(this.buttonColor, 10%);
        background: rgb(43, 114, 137);
    }
}
</style>