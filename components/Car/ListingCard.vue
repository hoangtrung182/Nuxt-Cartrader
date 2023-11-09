<script setup>
const props = defineProps({
    item: Object
})

const emit = defineEmits(['removeListing'])

</script>

<template>
    <div class="shadow rounded overflow-hidden flex justify-between mb-4">
        <div class="flex">
            <NuxtImg :src="item.url" class="w-80 mr-3 h-44" alt="" /> 
            <div class="p-3">
                <h1 class="text-2xl">{{ item.name }}</h1>
                <p class="text-blue-400">${{ item.price }}</p>
            </div>
        </div>
        <div class="flex p-3 space-x-2">
            <NuxtLink class="text-blue-400" :to="`/profile/listings/view/${item.id}`">View</NuxtLink>
            <p @click="emit('removeListing', item)" class="text-red-400 cursor-pointer">Delete</p>    
        </div>
    </div>
</template>