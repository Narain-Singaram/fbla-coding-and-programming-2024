<template>
  <div class="bg-gray-100 p-6">
    <div class="flex items-center mb-4 space-x-4">
      <button @click="changeView('grid')" :class="{ 'font-semibold': viewMode === 'grid' }">Grid View</button>
      <button @click="changeView('list')" :class="{ 'font-semibold': viewMode === 'list' }">List View</button>
      <button @click="changeView('card')" :class="{ 'font-semibold': viewMode === 'card' }">Card View</button>
      <button @click="changeView('table')" :class="{ 'font-semibold': viewMode === 'table' }">Table View</button>
    </div>
    <ul v-if="viewMode === 'grid'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="partner in partners" :key="partner.id" class="bg-white rounded-lg shadow-md p-4">
        <!-- Content for Grid View -->
        <h3 class="text-xl font-semibold">{{ partner.name }}</h3>
        <p class="text-gray-600 mt-2">Type: {{ partner.type }}</p>
        <p class="text-gray-600">Contact: {{ partner.contact }}</p>
      </li>
    </ul>
    <ul v-else-if="viewMode === 'list'" class="space-y-4">
      <li v-for="partner in partners" :key="partner.id" class="bg-white rounded-lg shadow-md p-4">
        <!-- Content for List View -->
        <h3 class="text-xl font-semibold">{{ partner.name }}</h3>
        <p class="text-gray-600">Type: {{ partner.type }}</p>
        <p class="text-gray-600">Contact: {{ partner.contact }}</p>
      </li>
    </ul>
    <ul v-else-if="viewMode === 'card'" class="space-y-4">
      <li v-for="partner in partners" :key="partner.id" class="bg-white border rounded-xl shadow-sm sm:flex dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div class="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-l-xl sm:max-w-[15rem] md:rounded-tr-none md:max-w-xs">
          <!-- Image -->
          <img class="w-full h-full absolute top-0 left-0 object-cover" :src="partner.imageSrc" :alt="partner.name">
        </div>
        <div class="flex flex-wrap">
          <div class="p-4 flex flex-col h-full sm:p-7">
            <!-- Content for Card View -->
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">
              {{ partner.name }}
            </h3>
            <p class="mt-1 text-gray-800 dark:text-gray-400">
              {{ partner.description }}
            </p>
            <div class="mt-5 sm:mt-auto">
              <p class="text-xs text-gray-500 dark:text-gray-500">
                Last updated 5 mins ago
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- Table view -->
    <table v-else-if="viewMode === 'table'" class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Type</th>
          <th class="px-4 py-2">Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="partner in partners" :key="partner.id">
          <td class="border px-4 py-2">{{ partner.name }}</td>
          <td class="border px-4 py-2">{{ partner.type }}</td>
          <td class="border px-4 py-2">{{ partner.contact }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    partners: Array
  },
  data() {
    return {
      viewMode: 'grid'
    };
  },
  methods: {
    changeView(mode) {
      this.viewMode = mode;
    }
  }
};
</script>
