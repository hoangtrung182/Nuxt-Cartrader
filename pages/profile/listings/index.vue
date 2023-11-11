<script setup>
definePageMeta({
    layout: 'custom',
    // middleware: ['auth'] //using global auth middleware
})

const { listing } = useCars();
const listings = ref(listing);

const onHandleRemove = (item) => {
    listings.value.splice(listings.value.indexOf(item), 1);
}

</script>

<template>
    <div class="">
        <div class="flex justify-between items-center mt-24">
            <h1 class="text-center text-6xl">My listings</h1>
            <NuxtLink to="/profile/listings/create" class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer">
                +
            </NuxtLink>
        </div>
        <div class="shadow rounded p-3 mt-5">
            <CarListingCard v-for="item in listings" :key="item.id" :item="item" @removeListing="onHandleRemove"/>
        </div>
    </div>  
</template>