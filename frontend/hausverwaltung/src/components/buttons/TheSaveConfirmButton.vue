<template>
    <section class="w-full flex justify-center items-center">
        <button class="bg-thirdly w-24
            h-10 rounded-2xl
            text-2xl
            text-white
            hover:bg-thirdlyh ease-in-out">{{ btnText }}</button>
    </section>
</template>

<script>
export default {
    props: {
        btnText: {
            type: String,
            required: true
        }
    },
    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>