<template>
  <div data-theme="night">
    <header>
      <Header />
    </header>
    <SearchFilterBar @search="performSearch" />
    <PartnerList :partners="filteredPartners" />
    <Chatbot />
  </div>
</template>

<script setup lang="ts">
import NewAddPartner from '/components/NewAddPartner.vue';
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

function performSearch(query: string) {
  searchQuery.value = query;
}
</script>

<style>
  html {
    font-family: "IBM Plex Sans" !important;
  }
</style>


