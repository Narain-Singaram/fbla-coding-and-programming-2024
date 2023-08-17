<template>
  <div class="partner-list">
    <ul class="partner-items">
      <li v-for="partner in partners" :key="partner.id" class="partner-item">
        <h3 class="partner-name">{{ partner.name }}</h3>
        <p class="partner-details">Type: {{ partner.type }}</p>
        <p class="partner-details">Contact: {{ partner.contact }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    partners: Array
  }
};
</script>

<style scoped>
.partner-list {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.partner-items {
  list-style: none;
  padding: 0;
}

.partner-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.partner-name {
  font-size: 1.5rem;
  margin: 0;
}

.partner-details {
  margin: 5px 0;
}

/* You can add more styles or customize as needed */
</style>
