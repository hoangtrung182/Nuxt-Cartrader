<script setup>
const route = useRoute();
const { toTitleCase } = useUtilities();

useHead({
    title: `${toTitleCase(route.params.make) || 'Cars'} in ${toTitleCase(route.params.city)}`
})

definePageMeta({
  layout: 'custom'
})


</script>

<template>
    <div class="">
      <div class="mt-32 flex ">
        <NuxtErrorBoundary >
          <CarSidebar />
          <NuxtPage />
          <template #error="{error}">
            <div class="text-center flex flex-col mx-auto">
              <h1 class="text-4xl text-red-600">Sorry, something went wrong!!</h1>
              <code>{{ error }}</code>
              <button @click="error.value = null" class="text-white bg-blue-400 text-3xl rounded px-10 py-3">Go Back</button>
            </div>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
</template>