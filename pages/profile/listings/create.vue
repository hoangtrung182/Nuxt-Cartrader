<script setup>
import { inferredPredicate } from '@babel/types';

definePageMeta({
    layout: 'custom'
})

const { makes } = useCars();

const info = useState('adInfo', () => {
    return {
        make: '',
        model: '',
        year: '',
        price: '',
        seats: '',
        miles: '',
        features: '',
        description: '',
        image: null
    }
});

const inputs = [
    { 
        id: 1,
        title: 'Make *',
        name: 'make',
        placeholder: '...'
    },
    { 
        id: 2,
        title: 'Model *',
        name: 'model',
        placeholder: '...'
    },
    { 
        id: 3,
        title: 'Year *',
        name: 'year',
        placeholder: '...'
    },
    { 
        id: 4,
        title: 'City *',
        name: 'city',
        placeholder: '...'
    },
    { 
        id: 5,
        title: 'Seats *',
        name: 'seats',
        placeholder: '...'
    },
    { 
        id: 6,
        title: 'Miles *',
        name: 'miles',
        placeholder: '...'
    },
    { 
        id: 7,
        title: 'Features *',
        name: 'features',
        placeholder: '...'
    }
];

const onChange = (data, name) => {
    info.value[name] = data;
}

</script>

<template>
    <div class="p-3">
        <div class="mt-20">
            {{ info.make }}
            <h1 class="text-6xl">Create a new listing</h1>
        </div>
        <div class="shadow rounded mt-5 p-2 flex flex-wrap justify-between">
            <CarAdSelect title="Make *" :options="makes" name="make" @change-input="onChange" />
            <CarAdInput v-for="input in inputs" :key="input.id" @change-input="onChange" :input="input" />
            <CarAdTextArea name="description" title="Description *" />
            <CarAdImage @change-input="onChange" />
        </div>
    </div>
</template>
