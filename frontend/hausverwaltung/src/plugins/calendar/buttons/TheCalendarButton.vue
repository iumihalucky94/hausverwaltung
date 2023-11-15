<template>
    <button :style="buttonStyle">{{ buttonText }}</button>
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
    },
    computed: {
        buttonStyle() {
            return {
                '--button-color': this.buttonColor,
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
    width: 4rem;
    height: 2.5rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    // background: rgb(128, 195, 217);
    border: 0;
    border-radius: 12px;
    transition: 0.3s all ease-in-out;
    background: var(--button-color);

    &:hover {
        background: rgba(var(--button-color-rgb), 0.1);
        // background: darken(this.buttonColor, 10%);
        // background: rgb(87, 172, 200);
    }
}
</style>