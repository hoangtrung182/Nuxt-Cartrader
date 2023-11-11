<script setup>
import useFetchCarDetail from '~/composables/useFetchCarDetail';
import { useUtilities } from '~/composables/useUtilities';

const route = useRoute();
const { toTitleCase } = useUtilities();
useHead({
    title: `${toTitleCase(route.params.name)} in store`
})
definePageMeta({
  layout: 'custom'
})
const { data: car } = await useFetchCarDetail(route.params.id);

// const car = computed(() => {
//   return cars.find((c) => {
//   return c.id === (route.params.id)
//   })
// });

// if(!car.value) {
//   throw createError({
//     statusCode: 404,
//     message: `Cant find car with id of ${route.params.id}`
//   })
// }

</script>

<template>
  <div class="">
        <CarDetailHero :car="car"/>
        <CarDetailAttribute :features="car.features" />
        <CarDetailDescription :description="car.description"/>
        <CarDetailContact />
    </div>
</template>