<template>
  <div class="bg-gray-100 p-6">
    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="partner in props.partners" :key="partner.id" class="bg-white rounded-lg shadow-md p-4">
        <NuxtLink :to="'/partner/' + partner.id">
          <h3 class="text-xl font-semibold">{{ partner.name }}</h3>
          <p class="text-gray-600 mt-2">Type: {{ partner.type }}</p>
          <p class="text-gray-600">Contact: {{ partner.contact }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  partners: {
    type: Array<any>,
    required: true,
  },
});
</script>
