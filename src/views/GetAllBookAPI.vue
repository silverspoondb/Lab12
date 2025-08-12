
<template>
  <div v-if="allBooks.length" class="json-view">
    <h1>All Books (JSON)</h1>
    <pre>{{ JSON.stringify(allBooks, null, 2) }}</pre>
  </div>
  <div v-else class="json-view">
    <h1>All Books (JSON)</h1>
    <p>Loading or no books found.</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const allBooks = ref([]);

const getAllBooks = async () => {
  try {
    const response = await fetch('src/assets/json/authors.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const authors = await response.json();
    allBooks.value = authors.flatMap(author => author.famousWorks);
  } catch (err) {
    allBooks.value = [];
    console.error('Error loading authors data:', err);
  }
};

onMounted(() => {
  getAllBooks();
});
</script>

<style>
.json-view {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  font-family: monospace;
}
pre {
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
