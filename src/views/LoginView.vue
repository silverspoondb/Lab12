<template>
  <div class="container mt-5" style="max-width:400px;">
    <h2 class="text-center mb-4">Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button class="btn btn-primary w-100" type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuth()

const login = () => {
  if (username.value === 'admin' && password.value === '12345') {
    auth.login()
    router.push('/about')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>