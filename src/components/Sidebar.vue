<template>
  <aside class="sidebar">
    <div class="logo">CBT MATH</div>
    <nav>
      <ul>
        <li>
          <router-link to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <a href="#" class="nav-item" :class="{ active: $route.path.startsWith('/questions') }" @click.prevent="toggleQuestionsMenu">
            Question
            <span class="dropdown-arrow" :class="{ open: showQuestionsSubmenu }">&#9660;</span>
          </a>
          <ul v-if="showQuestionsSubmenu" class="submenu">
            <li>
              <router-link to="/questions" class="submenu-item" :class="{ active: $route.path === '/questions' }">List Questions</router-link>
            </li>
            <li>
              <router-link to="/questions/add" class="submenu-item" :class="{ active: $route.path === '/questions/add' }">Add New Question</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/courses" class="nav-item" :class="{ active: $route.path === '/courses' }">Courses</router-link>
        </li>
        <li>
          <router-link to="/teachers" class="nav-item" :class="{ active: $route.path === '/teachers' }">Teachers</router-link>
        </li>
        <li>
          <router-link to="/assignments" class="nav-item" :class="{ active: $route.path === '/assignments' }">Assignments</router-link>
        </li>
        <li>
          <router-link to="/results" class="nav-item" :class="{ active: $route.path === '/results' }">Results</router-link>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <p v-if="authStore.user">Logged in as: {{ authStore.user.username }}</p>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const showQuestionsSubmenu = ref(route.path.startsWith('/questions'));

const toggleQuestionsMenu = () => {
  showQuestionsSubmenu.value = !showQuestionsSubmenu.value;
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #343a40;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
}

.sidebar .logo {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #ffd700;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 10px; /* Jarak antar item navigasi utama */
}

/* Gaya dasar untuk semua item navigasi utama (router-link atau a) */
.nav-item {
  color: #adb5bd;
  text-decoration: none;
  padding: 10px 15px;
  display: flex; /* Menggunakan flex untuk Question agar panah bisa di kanan */
  justify-content: space-between; /* Untuk Question, dorong panah ke kanan */
  align-items: center;
  border-radius: 5px; /* Sudut membulat */
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: transparent; /* Pastikan latar belakang default transparan */
}

.nav-item:hover {
  background-color: #495057; /* Latar belakang saat di-hover */
  color: white; /* Teks putih saat di-hover */
}

.nav-item.active {
  background-color: #007bff; /* Warna biru untuk item aktif */
  color: white; /* Teks putih untuk item aktif */
  font-weight: bold; /* Teks lebih tebal untuk item aktif */
}

.submenu {
  list-style: none;
  padding-left: 20px; /* Indentasi submenu */
  margin-top: 5px;
  margin-bottom: 5px;
}

/* Gaya untuk item di dalam submenu */
.submenu-item {
  color: #adb5bd;
  text-decoration: none;
  padding: 8px 15px; /* Padding lebih kecil dari nav-item */
  display: block; /* Agar bisa mengisi lebar */
  border-radius: 3px; /* Sudut membulat lebih kecil */
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: #495057; /* Latar belakang submenu default */
  font-size: 0.9em; /* Ukuran font lebih kecil */
  margin-bottom: 5px; /* Jarak antar item submenu */
}

.submenu-item:last-child {
  margin-bottom: 0; /* Hapus margin bawah untuk item terakhir submenu */
}

.submenu-item:hover {
  background-color: #5a6268; /* Latar belakang saat di-hover di submenu */
  color: white;
}

.submenu-item.active {
  background-color: #0056b3; /* Warna biru yang sedikit lebih gelap untuk submenu aktif */
  color: white;
  font-weight: bold;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(90deg); /* Putar panah saat submenu terbuka */
}

.sidebar-footer {
  margin-top: auto; /* Dorong footer ke bawah */
  padding-top: 20px;
  border-top: 1px solid #495057;
  text-align: center;
  font-size: 0.9em;
}

.sidebar-footer p {
  margin-bottom: 10px;
  color: #adb5bd;
}

.logout-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>