<template>
    <section
        class="w-screen h-screen bg-loginBG bg-cover bg-center bg-opacity-100 flex items-center justify-center relative">
        <div class="w-2/6 h-2/6 border-solid border-2 bg-primary rounded-3xl flex justify-center items-center flex-col">
            <div class="w-80 h-80% flex flex-col justify-around">
                <p class="text-secondary text-4xl text-center uppercase">Kagerimmo</p>
                <p class="text-thirdly text-4xl text-center">Login</p>

                <TheInputField class=" text-secondary" inputLabel="Username: " inputName="username"
                    inputPlaceholder="Your Username/Login" />
                <TheInputField class=" text-secondary" inputLabel="Password: " inputName="password"
                    inputPlaceholder="Your Password" />
                <TheSaveConfirmButton btnText="Login" />

            </div>
        </div>
    </section>
</template>

<script>
import TheInputField from '../components/static/TheInputField.vue';
import TheSaveConfirmButton from '../components/buttons/TheSaveConfirmButton.vue';

export default {
    components: {
        TheInputField,
        TheSaveConfirmButton
    },
    data() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>