<template>
    <section class="">
        <p class="text-thirdly text-2xl">{{ headerText }}</p>
    </section>
</template>

<script>
export default {
    props: {
        headerText: {
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