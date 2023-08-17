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
      <ul v-if="showSuggestions" class="autocomplete-list">
        <li
          v-for="suggestion in autocompleteSuggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      showSuggestions: false,
      partners: [
  {
    "id": 1,
    "name": "Local Business A",
    "type": "Business",
    "contact": "John Doe"
  },
  {
    "id": 2,
    "name": "Community Organization B",
    "type": "Community",
    "contact": "Jane Smith"
  }
] // Your partner data array
    };
  },
  computed: {
    autocompleteSuggestions() {
      return this.partners
        .filter(partner =>
          partner.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .map(partner => partner.name);
    }
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchQuery);
      this.showSuggestions = true; // Show suggestions as you type
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
      this.hideSuggestions(); // Hide suggestions when a suggestion is selected
    },
    hideSuggestions() {
      // Delay hiding suggestions to allow time for a click on a suggestion to register
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    }
  }
};
</script>

<style scoped>
/* ... Existing styles ... */

input {
  padding: 2px 3px; 
  background: red;
  display: block;
}

.search-input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.autocomplete-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1; /* Make the suggestions appear above the input */
}

.autocomplete-list li {
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.autocomplete-list li:hover {
  background-color: #f5f5f5;
}
</style>
