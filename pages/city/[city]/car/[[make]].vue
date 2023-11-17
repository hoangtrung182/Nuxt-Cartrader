<script setup>
const route = useRoute();
const { data: cars } = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.query.make,
});

watch(
  () => route.query,
  () => {
    window.location.reload(true);
  }
);
</script>

<template>
  <div class="">
    <CarCards v-if="cars" :cars="cars" />
    <h2 class="text-red-600" v-else>No found cars with filters</h2>
  </div>
</template>
