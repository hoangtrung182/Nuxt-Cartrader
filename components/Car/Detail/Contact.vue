<script setup>
const route = useRoute();

const message = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const errorMessage = ref("");
const successMessage = ref("");

const isSubmitDisabled = computed(() => {
  for (let key in message.value) {
    if (!message.value[key]) return true;
  }
  return false;
});

const handleSubmit = async () => {
  try {
    const res = await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: "post",
      body: message.value,
    });
    message.value = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    successMessage.value = "Message sent!";
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error.message;
    successMessage.value = "";
  }
};
</script>

<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input
        type="text"
        class="border p-2 rounded-sm"
        placeholder="Name"
        v-model="message.name"
      />
      <input
        type="text"
        class="border p-2"
        placeholder="Email"
        v-model="message.email"
      />
      <input
        type="text"
        class="border px-1 py-2"
        placeholder="Phone"
        v-model="message.phone"
      />
    </div>
    <div class="flex mt-4 w-[700px]">
      <textarea
        class="border p-2 w-full rounded"
        placeholder="Message"
        v-model="message.message"
      ></textarea>
    </div>
    <button
      @click="handleSubmit"
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4"
      :disabled="isSubmitDisabled"
    >
      Submit
    </button>
    <p v-if="errorMessage" class="mt-3 text-red-400">{{ errorMessage }}</p>
    <p v-if="successMessage" class="mt-3 text-green-400">
      {{ successMessage }}
    </p>
  </div>
</template>
