<script setup>
useHead({
    title: 'Create new'
});

const props = defineProps({
    title: String,
    name: String,
    // placeholder: String,
});

const emits = defineEmits(['changeInput']);

const state = ref('');

const onChange = () => {
    emits('changeInput', state.value, props.input.name);
}

</script> 

<template>
    <div class="flex flex-col w-[100%] mt-2">
        <label for="" class="mb-1 text-cyan-500 text-sm">{{ title }}</label>
        <textarea type="text" class="p-2 border w-100 rounded" placeholder="Enter something ..." name="name" v-model="state" @input="onChange"></textarea>    
    </div>
</template>