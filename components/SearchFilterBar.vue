<template>
  <div class="search-filter-bar flex flex-col items-center">
    <div class="search-input-wrapper relative w-80 my-4">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
        class="search-input w-full p-2 border-2 border-gray-300 rounded-md transition duration-300 focus:ring focus:ring-blue-400 focus:border-blue-400"
        placeholder="Search partners"
      />
      <ul v-if="showSuggestions" class="autocomplete-list absolute w-full bg-white border-2 border-gray-300 border-t-0 rounded-b-md shadow-md">
        <li
          v-for="suggestion in autocompleteSuggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
          class="suggestion-item p-2 cursor-pointer transition duration-300 hover:bg-gray-100"
        >
          {{ suggestion }}
        </li>
      </ul>
      <p v-if="showNoResultsMessage" class="no-results-message text-center text-gray-500 mt-2">No results found.</p>
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