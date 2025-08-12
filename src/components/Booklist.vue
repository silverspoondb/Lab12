<template>
  <div class="booklist-container">
    <h2>Books with ISBN > 1000 (sorted & limited)</h2>
    <div v-if="loading" class="loading">Loading books...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <table class="table table-striped" v-if="books.length">
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.isbn }}</td>
          <td>{{ book.name }}</td>
          <td>
            <button 
              class="btn btn-danger btn-sm" 
              @click="deleteBook(book.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <p v-if="!loading && !error && books.length === 0">No books found with ISBN greater than 1000.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc,
  query,
  where,    
  orderBy, 
  limit    
} from 'firebase/firestore';

const books = ref([]);
const loading = ref(true);
const error = ref(null);

//where、orderBy和limit
const fetchBooks = async () => {
  try {
    const isbnCondition = where('isbn', '>', 1000);
    const sortByIsbn = orderBy('isbn', 'asc');
    const limitResults = limit(3);

    const booksQuery = query(
      collection(db, 'books'),
      isbnCondition,   // 筛选
      sortByIsbn,      // 排序
      limitResults     // 限制数量
    );
    
    // 执行查询（异步操作）
    const querySnapshot = await getDocs(booksQuery);
    
    // 处理查询结果
    books.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    error.value = null;
  } catch (err) {
    error.value = `Error loading books: ${err.message}`;
    console.error('Fetch error:', err);
  } finally {
    loading.value = false; // 无论成功失败都结束加载状态
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchBooks();
});

// 删除书籍功能
const deleteBook = async (id) => {
  try {
    await deleteDoc(doc(db, 'books', id));
    alert('Book deleted successfully!');
    // 删除后重新获取数据以更新列表
    fetchBooks();
  } catch (err) {
    error.value = `Error deleting book: ${err.message}`;
    console.error('Delete error:', err);
  }
};
</script>

<style scoped>
.booklist-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.loading {
  color: #666;
  text-align: center;
  padding: 20px;
}

.error {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
}

table {
  width: 100%;
  margin-top: 15px;
}

th, td {
  text-align: left;
  padding: 12px;
}

th {
  background-color: #f8f9fa;
}
</style>