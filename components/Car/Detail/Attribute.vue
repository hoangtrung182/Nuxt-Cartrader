<script setup>
const props = defineProps({
    features: Array
})
const featuresToArray = props.features.split(',');

</script>

<template>
    <div class="mr-10 mt-5 border-b pb-5" >
        <div class="flex text-lg mt-2" v-for="ft in featuresToArray" :key="ft">
            <p class="rounded text-lime-800 mr-3">v</p>
            <p>{{ ft }}</p>
        </div>
    </div>
</template>