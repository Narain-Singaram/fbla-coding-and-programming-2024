<template>
  <div class="search-filter-bar">
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
      >
        {{ suggestion }}
      </li>
    </ul>
    <p v-if="showNoResultsMessage" class="no-results-message">No results found.</p>
  </div>
</template>

<script>
import partnersData from './partners.json';

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
      this.$emit("search", this.searchQuery);
      this.showSuggestions = true;
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
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

<style scoped>
/* ... Existing styles ... */

.no-results-message {
  text-align: center;
  color: #888;
  margin-top: 10px;
}
</style>
