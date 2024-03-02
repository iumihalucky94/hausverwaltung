<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class="miin-w-5/6 h-full pt-5 flex justify-center items-center">
            <TheSectionHeader headerText="Lieferant Liste" />
            <TheSaveConfirmButton btnText="Create new!" :navigate="true" routeName="create_supplier" />
        </div>
    </section>
</template>

<script>

import TheSaveConfirmButton from '../../components/buttons/TheSaveConfirmButton.vue'

export default {
    components: {
        TheSaveConfirmButton

    },
    data() {
        return {
            desiredHeader: 'supplier'
        }
    },
    methods: {
        dataChecker() {
            console.log(1)
        }
    },
    computed: {
    },
    mounted() {
        this.dataChecker
    }
}
</script>

<style lang="scss" scoped></style>