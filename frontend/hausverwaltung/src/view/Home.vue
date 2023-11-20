<template>
    <section>
        <div class="h-screen max-w-screen  flex items-center justify-center bg-sky-400 ">
            <div class="w-1/2 h-1/2 flex flex-col justify-center items-center content-around">
                <h1 class="text-white text-4xl">Home Page</h1>
                <router-link :to="{ path: '/calendar' }">
                    <button
                        class="my-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        List of tasks
                    </button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>
