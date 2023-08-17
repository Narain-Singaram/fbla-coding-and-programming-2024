<template>
  <div>
    <h1>Local Partners Information</h1>
    <SearchFilterBar @search="performSearch" />
    <PartnerList :partners="filteredPartners" />
  </div>
</template>

<script>
import SearchFilterBar from "/SearchFilterBar.vue";
import PartnerList from "/PartnerList.vue";

export default {
  components: {
    SearchFilterBar,
    PartnerList
  },
  data() {
    return {
      partners: [
        {
          id: 1,
          name: "Local Business A",
          type: "Business",
          contact: "John Doe"
        },
        {
          id: 2,
          name: "Community Organization B",
          type: "Community",
          contact: "Jane Smith"
        },
        // Add more partner data here
      ],
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
