<template>
  <div>
    <header>
      <Header />
    </header>
    <SearchFilterBar @search="performSearch" />
    <PartnerList :partners="filteredPartners" />
  </div>
</template>

<script setup lang="ts">
import partnerData from "@/assets/partners.json";

const partners = ref(partnerData);
const searchQuery = ref("");

const filteredPartners = computed(() => {
  return partners.value.filter(partner => {
    return (
      partner.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      partner.contact.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

function performSearch(query) {
  searchQuery.value = query;
}
</script>


