<script setup>
const city = ref('');
const cityError = ref(false);

const getCity = computed(() => city.value.trim().split(' ').join(''));



const handleSearch = () => {
  if(!city.value) {
    return cityError.value = true;
  }
  navigateTo(`/city/${getCity.value}/car`)
}

const searchCity = (e) => {
  const value = e.target.value.trim();
  if(value) {
    navigateTo(`/city/${value}/car`)
  }
}

</script>

<template>
      <!-- Search bar -->
      <div class="font-serif w-[800px] text-2xl rounded-full bg-white flex justify-between items-center overflow-hidden drop-shadow-2xl mx-auto">
        <input type="text" class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none" @keyup.enter="searchCity" :class="{'border border-red-500': cityError}" v-model="city" placeholder="Search by name...">
        <button class="bg-sky-500 py-4 px-10 text-white" @click="handleSearch">Search</button>
      </div>
</template>