<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login to CBT MATH</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="login-button" :disabled="authStore.loading">
          <span v-if="authStore.loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <p v-if="authStore.error" class="error-message">{{ authStore.error }}</p>
      </form>
      <p class="login-hint">Hint: `guru`/`password123` or `siswa`/`password123`</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value);
  if (success) {
    router.push('/dashboard');
  }
  // Error message is handled by authStore.error and displayed in template
};
</script>

<style scoped>
/* Pastikan CSS ini sudah ada di src/views/LoginView.vue */
.login-container {
  display: flex;
  justify-content: center; /* Pusatkan horizontal */
  align-items: center; /* Pusatkan vertikal */
  min-height: 100vh; /* Pastikan mengambil seluruh tinggi viewport */
  width: 100%;
  background-color: #f4f7f6; /* Warna latar belakang sama dengan body global */
}

.login-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Batasi lebar maksimum kotak login */
  text-align: center;
}

.login-box h2 {
  margin-bottom: 30px;
  color: #343a40;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #343a40;
}

/* Input styles are global in style.css */

.login-button {
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.login-button:disabled {
  background-color: #a0c9ed;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 15px;
}

.login-hint {
  margin-top: 20px;
  font-size: 0.9em;
  color: #777;
}
</style>