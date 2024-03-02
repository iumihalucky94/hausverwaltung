<template>
    <section :showModal="false" v-if="showModalValue" id="deleteModal" tabindex="-1" aria-hidden="true"
        class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full md:h-full bg-opacity-70 bg-slate-400 ">
        <div class="flex  w-full p-4 max-w-md h-full md:h-auto">
            <div class="relative w-full h-full p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button @click="cancel"
                    class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <fai icon="fa-solid fa-xmark xl" class="text-slate-300 hover:text-slate-100  text-2xl" />
                    <span class="sr-only">Close modal</span>
                </button>
                <fai icon="fa-solid fa-trash" class="text-gray-400 dark:text-gray-500 block w-11 h-11 mb-3.5 mx-auto" />
                <p class="mb-4 text-gray-500 dark:text-gray-300">{{ modalWindowText.modalText }}</p>
                <div class="w-full h-full flex justify-center items-center">
                    <div class="bg-red-400 bg-opacity-80 w-3/4 flex justify-center items-center p-4 rounded-2xl mb-4">
                        <fai icon="fa-solid fa-triangle-exclamation"
                            class="text-gray-400 dark:text-slate-200 text-xl mr-2" />
                        <p class="text-slate-300 text-m">
                            {{ modalWindowText.hintText }}
                        </p>
                    </div>
                </div>
                <div class="flex justify-around items-center space-x-4">
                    <button @click="cancel" type="button"
                        class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        {{ modalWindowText.cancelText }}
                    </button>
                    <button @click="confirm" type="submit"
                        class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        {{ modalWindowText.confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        showModal: {
            // type: Boolean,
            default: false
        },
        modalWindowText: {
            required: true
        }
    },
    data() {
        return {
            showModalValue: false,
        }
    },
    watch: {
        showModal() {
            this.showModalValue = this.showModal
            console.log(this.showModal)
        }
    },
    methods: {
        cancel() {
            this.$emit('closeWindow', [this.showModalValue]);
            this.showModalValue = false
        },
        confirm() {
            this.$emit('confirmWindow', [this.showModalValue]);
            this.showModalValue = false
        }

    }
}
</script>

<style lang="scss" scoped></style>