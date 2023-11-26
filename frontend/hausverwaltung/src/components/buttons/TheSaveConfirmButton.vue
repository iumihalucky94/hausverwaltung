<template>
    <section class="w-full flex justify-center items-center">
        <button class="bg-thirdly px-4 h-10 rounded-2xl text-xl text-white font-light hover:bg-thirdlyh ease-in-out"
            @click="handleButtonClick">
            {{ btnText }}
        </button>
    </section>
</template>

<script>
export default {
    props: {
        btnText: {
            type: String,
            required: true
        },
        routeName: {
            type: String,
        },
        navigate: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleButtonClick() {
            if (this.navigate) {
                // Trigger route navigation based on the passed routeName prop
                this.$router.push({ name: this.routeName });
            }
            // else {
            //     // Perform other action, e.g., save data
            //     this.saveData();
            // }
        },
        // saveData() {
        //     // Implement your save data logic here
        //     console.log('Data saved!');
        // }
    }
}
</script>

<style lang="scss" scoped></style>
