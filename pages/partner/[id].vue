<template>
  <div v-show="company.name" class="mx-12 my-3">
    <h1 class="text-xl font-semibold">{{ company.name }}</h1>
    <hr class="my-2 w-96" />
    <p>Type: {{ company.type }}</p>
  </div>
</template>

<script setup lang="ts">
import partners from "~/assets/partners.json";

const route = useRoute();

const company = ref({
  name: "",
  type: "",
});

onMounted(() => {
  const companyId = route.params.id;
  partners.forEach(companyI => {
    if (typeof companyId === 'string') {
      if (companyI.id === parseInt(companyId)) {
        company.value = companyI;
        return;
      }
    }
  });
});
</script>
