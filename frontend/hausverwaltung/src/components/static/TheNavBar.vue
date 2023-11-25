<template>
    <section class="max-w-screen overflow-hidden  ">
        <div class="flex justify-between overflow-hidden bg-primary text-secondary h-20">
            <router-link :to="{ path: '/home' }" class="w-3/12">
                <div class="w-full h-full flex justify-center items-center">
                    <img class="w-24" src="@/assets/images/firm_logo.png" alt="">
                    <p class="text-2xl ml-4 uppercase">Kagerimmo</p>
                </div>
            </router-link>

            <div class="w-7/12 text-xl">
                <ul class="h-full w-full flex flex-row items-center justify-around text-center">
                    <router-link :to="{ path: '/home' }">
                        <li class=" hover:text-thirdly">Home</li>
                    </router-link>
                    <router-link :to="{ path: '/list' }">
                        <li class="hover:text-thirdly">List</li>
                    </router-link>
                    <router-link :to="{ path: '/objects' }">
                        <li class="hover:text-thirdly">Objects</li>
                    </router-link>
                    <router-link :to="{ path: '/tasks' }">
                        <li class="hover:text-thirdly">Tasks</li>
                    </router-link>
                    <router-link :to="{ path: '/mandant_list' }">
                        <li class="hover:text-thirdly">Mandant</li>
                    </router-link>
                    <router-link :to="{ path: '/login' }">
                        <li class="hover:text-thirdly">Login</li>
                    </router-link>

                </ul>
            </div>
            <div class="w-2/12 h-full flex justify-center items-center">
                <button class="bg-secondary w-28 h-10 rounded-2xl text-primary  hover:bg-thirdly">
                    Log Out
                    <fai icon="fa-solid fa-arrow-right-from-bracket" />
                </button>
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
