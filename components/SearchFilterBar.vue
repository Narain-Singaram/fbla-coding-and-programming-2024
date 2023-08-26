<template>
  <div class="search-filter-bar flex flex-col items-center">
    <div class="search-input-wrapper relative w-80 my-4">
      <input         
        v-model="searchQuery"
        @input="handleSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions" 
        type="text" 
        placeholder="Type here" 
        class="input input-bordered input-primary w-full max-w-xs"
      />
      <ul v-if="showSuggestions" class="my-2 autocomplete-list absolute w-full bg-white rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
        <li
          v-for="suggestion in autocompleteSuggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
          class="suggestion-item p-2 cursor-pointer transition duration-300 hover:bg-gray-100"
        >
          {{ suggestion }}
        </li>
      </ul>
        <div v-if="showNoResultsMessage" id="toast-simple" class="my-4 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
          </svg>
          <div class="pl-4 text-sm font-normal">No Results Found</div>
      </div>
    </div>
  </div>
</template>

<script>
import partnersData from '@/assets/partners.json';

export default {
  data() {
    return {
      searchQuery: "",
      showSuggestions: false,
      partners: partnersData
    };
  },
  computed: {
    autocompleteSuggestions() {
      return this.partners
        .filter(partner =>
          partner.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .map(partner => partner.name);
    },
    showNoResultsMessage() {
      return this.showSuggestions && this.searchQuery.length > 0 && this.autocompleteSuggestions.length === 0;
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.length > 0) {
        this.showSuggestions = true;
      } else {
        this.showSuggestions = false;
      }
      this.$emit("search", this.searchQuery);
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion; // Set the search query to the selected suggestion
      this.handleSearch(); // Trigger the search to filter the list
      this.hideSuggestions();
    },
    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    }
  }
};
</script>
