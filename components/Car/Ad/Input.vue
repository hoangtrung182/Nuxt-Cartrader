<script setup>
useHead({
    title: 'Create new'
});

const props = defineProps({
    input: Object
    // title: String,
    // name: String,
    // placeholder: String,
});

const emits = defineEmits(['changeInput']);

const state = ref('');

const onChange = () => {
    emits('changeInput', state.value, props.input.name);
}

</script> 

<template>
    <div class="flex flex-col w-[48%] mt-2">
        <label for="" class="mb-1 text-cyan-500 text-sm">{{ input.title }}</label>
        <input type="text" class="p-2 border w-100 rounded" :placeholder="input.placeholder" :name="input.name" v-model="state" @input="onChange">
    </div>
</template>