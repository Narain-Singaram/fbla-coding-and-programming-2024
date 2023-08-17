<template>
  <div class="search-filter-bar">
    <input
      v-model="searchQuery"
      @input="handleSearch"
      @focus="showSuggestions = true"
      @blur="showSuggestions = false"
      class="search-input"
      placeholder="Search partners"
    />
    <ul v-if="showSuggestions" class="autocomplete-list">
      <li v-for="suggestion in autocompleteSuggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>
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
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
      this.showSuggestions = false;
    }
  }
};
</script>

<style scoped>
/* ... Existing styles ... */

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
