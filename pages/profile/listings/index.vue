<script setup>
definePageMeta({
  layout: "custom",
  // middleware: ['auth'] //using global auth middleware
});

const user = useSupabaseUser();

const { data: listings, refresh } = await useFetch(
  `/api/car/listings/user/${user.value.id}`
);

const onHandleRemove = async (id) => {
  await $fetch(`/api/car/listings/${id}`, {
    method: "delete",
  });
  listings.value = listings.value.filter((c) => c.id !== id);
};
</script>

<template>
  <div class="">
    <div class="flex justify-between items-center mt-24">
      <h1 class="text-center text-6xl">My listings</h1>
      <NuxtLink
        to="/profile/listings/create"
        class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer"
      >
        +
      </NuxtLink>
    </div>
    <div class="shadow rounded p-3 mt-5">
      <CarListingCard
        v-for="item in listings"
        :key="item.id"
        :item="item"
        @remove-listing="onHandleRemove"
      />
    </div>
  </div>
</template>
