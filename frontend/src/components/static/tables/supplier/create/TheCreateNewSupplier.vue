<template>
    <section class="flex justify-center items-center">
        <div class="pt-5 flex justify-center items-center flex-col">
            <TheCreateNewForm />
        </div>
    </section>
</template>

<script>
import TheCreateNewForm from './TheCreateNewForm.vue';
export default {
    components: {
        TheCreateNewForm
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>