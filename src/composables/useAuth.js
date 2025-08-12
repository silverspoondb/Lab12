import { ref } from 'vue'

const isAuthenticated = ref(false)

export function useAuth() {
  return {
    isAuthenticated,
    login() { isAuthenticated.value = true },
    logout() { isAuthenticated.value = false }
  }
}