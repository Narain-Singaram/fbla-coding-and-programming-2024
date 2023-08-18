<template>
  <div class="search-filter-bar">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
        class="search-input"
        placeholder="Search partners"
      />
      <ul v-if="showSuggestions && autocompleteSuggestions.length > 0" class="autocomplete-list">
        <li
          v-for="suggestion in autocompleteSuggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
          class="suggestion-item"
        >
          {{ suggestion }}
        </li>
      </ul>
      <p v-if="showNoResultsMessage" class="no-results-message">No results found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import partnersData from '@/assets/partners.json';

const emit = defineEmits([ "search" ]);

const searchQuery = ref("");
const showSuggestions = ref(false);

const autocompleteSuggestions = computed(() => {
  return partnersData.filter(partner => {
    partner.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  }).map(partner => partner.name);
});

const showNoResultsMessage = computed(() => {
  return showSuggestions.value && searchQuery.value.length > 0 && autocompleteSuggestions.value.length === 0;
});

function handleSearch() {
  emit("search", searchQuery.value);
  showSuggestions.value = true;
}

function selectSuggestion(suggestion: string) {
  searchQuery.value = suggestion;
  hideSuggestions();
}

function hideSuggestions() {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
}
</script>

<style scoped>
.search-filter-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.autocomplete-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background-color: white;
  border: 2px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.suggestion-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}

.no-results-message {
  text-align: center;
  color: #888;
  margin-top: 10px;
}
</style>
