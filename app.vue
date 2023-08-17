<template>
  <div>
    <h1>AllySynergy</h1>
    <SearchFilterBar @search="performSearch" />
    <PartnerList :partners="filteredPartners" />
  </div>
</template>

<script>
import SearchFilterBar from "/SearchFilterBar.vue";
import PartnerList from "/PartnerList.vue";
import partnersData from './partners.json'; // Import the JSON file

export default {
  components: {
    SearchFilterBar,
    PartnerList
  },
  data() {
    return {
      partners: partnersData, // Use the imported data
      searchQuery: ""
    };
  },
  computed: {
    filteredPartners() {
      return this.partners.filter(partner => {
        return (
          partner.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          partner.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          partner.contact.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  },
  methods: {
    performSearch(query) {
      this.searchQuery = query;
    }
  }
};
</script>
