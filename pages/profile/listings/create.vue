<script setup>
definePageMeta({
  layout: "custom",
});
const { makes } = useCars();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const errorMessage = ref("");

const isButtonDisable = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) return true;
  }
  return false;
});

const info = useState("adInfo", () => {
  return {
    make: "",
    model: "",
    year: "",
    miles: "",
    price: "",
    city: "",
    seats: "",
    features: "",
    description: "",
    image: null,
  };
});

const inputs = [
  {
    id: 2,
    title: "Model *",
    name: "model",
    placeholder: "...",
  },
  {
    id: 3,
    title: "Year *",
    name: "year",
    placeholder: "...",
  },
  {
    id: 8,
    title: "Price *",
    name: "price",
    placeholder: "10000",
  },
  {
    id: 4,
    title: "City *",
    name: "city",
    placeholder: "...",
  },
  {
    id: 5,
    title: "Seats *",
    name: "seats",
    placeholder: "...",
  },
  {
    id: 6,
    title: "Miles *",
    name: "miles",
    placeholder: "...",
  },
  {
    id: 7,
    title: "Features *",
    name: "features",
    placeholder: "...",
  },
];

const onChange = (data, name) => {
  info.value[name] = data;
};

const handleSubmit = async () => {
  const fileName = Math.floor(Math.random() * 100000000);
  const { data, error } = await supabase.storage
    .from("images")
    .upload("public/ " + fileName, info.value.image);

  if (error) {
    return (errorMessage.value = "Cannot upload image");
  }
  const body = {
    ...info.value,
    features: info.value.features.split(", "),
    city: info.value.city.toLowerCase(),
    seats: parseInt(info.value.seats),
    price: parseInt(info.value.price),
    miles: parseInt(info.value.miles),
    year: parseInt(info.value.year),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path,
  };

  try {
    const response = await $fetch("/api/car/listings", {
      method: "post",
      body: body,
    });
    navigateTo("/profile/listings");
  } catch (error) {
    errorMessage.value = error.statusMessage;
    await supabase.storage.from("images").remove(data.path);
  }
};
</script>

<template>
  <div class="p-3">
    <div class="mt-20">
      <h1 class="text-6xl">Create a new listing</h1>
    </div>
    <div class="shadow rounded mt-5 p-2 flex flex-wrap justify-between">
      <CarAdSelect
        title="Make *"
        :options="makes"
        name="make"
        @change-input="onChange"
      />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        @change-input="onChange"
        :input="input"
      />
      <CarAdTextArea
        name="description"
        title="Description *"
        @change-input="onChange"
      />
      <CarAdImage @change-input="onChange" />
      <div class="">
        <button
          :disabled="isButtonDisable"
          @click="handleSubmit"
          class="bg-blue-400 rounded px-3 py-2 mt-2 text-white"
        >
          Submit
        </button>
        <p v-if="errorMessage" class="mt-3 text-red-400">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
