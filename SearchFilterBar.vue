<template>
  <div class="search-filter-bar">
    <input
      v-model="searchQuery"
      @input="handleSearch"
      class="search-input"
      placeholder="Search partners"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchQuery);
    }
  }
};
</script>

<style scoped>
.search-filter-bar {
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
