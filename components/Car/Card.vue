<script setup>
// import heart from '@assets/img/heart.png';
import heart from "@/assets/img/heart.png";
import heartoutline from "@/assets/img/heartoutline.png";

const props = defineProps({
  car: Object,
  favored: Boolean,
});

const emit = defineEmits(["favor"]);

const carName = computed(() => props.car.name.split(" ").join(""));
const config = useRuntimeConfig();
</script>

<template>
  <div
    class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
  >
    <img
      :src="favored ? heart : heartoutline"
      class="absolute w-7 right-5 top-2 z-20"
      alt=""
      @click="emit('favor', car.id)"
    />
    <div class="flex h-full" @click="navigateTo(`/car/${carName}-${car.id}`)">
      <NuxtImg
        :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
        class="w-[300px] h-full"
      />
      <div class="p-4 flex flex-col">
        <div class="">
          <h1 class="text-2xl text-blue-700">{{ car.name }}</h1>
          <p class="text-gray-700">{{ car.description }}</p>
        </div>
        <h1 class="mt-auto text-xl">$ {{ car.price }}</h1>
      </div>
    </div>
  </div>
</template>
