<script setup>
definePageMeta({
  layout: "custom",
});
const route = useRoute();

const { data } = useFetch(`/api/car/listings/${route.params.id}/message`);
</script>

<template>
  <div class="rounded shadow mt-20">
    <template v-if="data">
      <CarMessageCard
        v-for="message in data"
        :message="message"
        :key="message.id"
      />
    </template>
    <template v-else>
      <h2 class="text-xl text-red-400">This car's message is empty</h2>
    </template>
  </div>
</template>
