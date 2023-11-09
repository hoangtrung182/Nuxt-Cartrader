<script setup>
const route = useRoute();
const router = useRouter();
const { makes} = useCars();

const modal = ref({
    location: false,
    make: false,
    price: false
})

const searchValue = ref('Ottowa');
const priceRange = ref({
    min: '',
    max: ''
});

const priceRangeText = computed(() => {
    const minPrice = route.query.minPrice;
    const maxPrice = route.query.maxPrice;

    if(!minPrice && !maxPrice) return 'Any';
    else if(!minPrice && maxPrice) {
        return `< ${maxPrice}`
    } else if(minPrice && !maxPrice) {
        return `> ${minPrice}`
    } else {
        return `$${minPrice} - $${maxPrice}`
    }
})

const updateModal = (key) => {
    modal.value[key] = !modal.value[key];
}

const searchCity = () => {
    if(!searchValue.value) return;
    if(!isNaN(parseInt(searchValue.value))) {
        throw createError({
            statusCode: 400,
            message: 'Invalid city format'
        })
    }
    navigateTo(`/city/${searchValue.value}/car`);
}

const searchMake = (make) => {
    updateModal('make');
    navigateTo(`/city/${route.params.city}/car/${make}`);
} 

const onSearchPrice = () => {
    updateModal('price');
    if(priceRange.value.max && priceRange.value.min) {
        if(priceRange.value.min > priceRange.value.max) return;
        router.push({
            query: {
                minPrice: priceRange.value.min,
                maxPrice: priceRange.value.max
            }
        })
    }
    // navigateTo(`/city/${route.params.city}/car/${route.params.make}?minrange=${priceRange.value.min}&maxrange=${priceRange.value.max}`)
}
</script>

<template>
    <div class="shadow border w-64 mr-10 z-30 h-[190px]">
        <div class="p-5 flex justify-between items-center relative cursor-pointer border-b">
            <h3>Location</h3>
            <h3 @click="updateModal('location')" class="text-blue-300 capitalize">
                {{ route.params.city }}
            </h3>
            <div v-if="modal.location" class="absolute border shadow left-56 p-5 top-1 m-1 bg-white">
                <input type="text" v-model="searchValue" class="border p-1 rounded">
                <button @click="searchCity" class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button>
            </div>
        </div>

        <div class="p-5 flex justify-between items-center relative cursor-pointer border-b">
            <h3>Make</h3>
            <h3 class="text-blue-300 capitalize">
                <h3 @click="updateModal('make')">{{ route.params.make || 'Any'}}</h3>
            </h3>
            <div v-if="modal.make" class="absolute border shadow top-2 left-56 p-5 -m-1 w-[600px] bg-white flex justify-between flex-wrap">
                <h4 v-for="make in makes" :key="make"  class="w-1/3" @click="searchMake(make)">
                    {{ make }}
                </h4>
            </div>
        </div>

        <div class="p-5 flex justify-between items-center relative cursor-pointer border-b">
            <h3>Price</h3>
            <h3 @click="updateModal('price')" class="text-blue-300 capitalize">{{ priceRangeText }}</h3>
            <div v-if="modal.price" class="absolute border shadow top-2 left-56 p-5 -m-1 w-[600px] bg-white flex justify-between flex-wrap">
                <input type="number" placeholder="Min" v-model="priceRange.min" class="border p-1 rounded"/>
                <input type="number" placeholder="Max" v-model="priceRange.max" class="border p-1 rounded" />
                <button @click="onSearchPrice" class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button>
            </div>  
        </div>
    </div>
</template>