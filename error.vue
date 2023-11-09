<script setup>
const error = useError();

const handleError = () => {
    clearError({
        redirect: '/'
    })
}
</script>

<template>
    <div class="flex h-screen justify-center items-center flex-col">
        <h1 class="text-9xl ">{{ error.statusCode }}</h1>
        <p class="text-4xl mt-7">{{ error.message }}</p>
        <button @click="handleError" class="rounded mt-7 text-2xl bg-blue-400 text-white px-7 py-4 ">Go back</button>
    </div>
</template>