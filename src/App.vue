<template>
  <div id="app">
    <template v-if="$route.name !== 'Login'">
      <Sidebar />
    </template>
    <div class="main-content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style>
/* Global styles for body and app layout */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Menggunakan font dari style.css global */
  margin: 0;
  padding: 0; /* Pastikan tidak ada padding di body */
  background-color: #f4f7f6;
  min-height: 100vh; /* Sangat penting: Pastikan body mengambil tinggi penuh viewport */
  /* overflow: hidden; */ /* Ini bisa dihapus jika menyebabkan masalah scroll di halaman lain */
}

#app {
  display: flex; /* Mengatur #app sebagai flex container */
  min-height: 100vh; /* Pastikan #app mengambil tinggi penuh viewport */
  width: 100vw; /* Pastikan #app mengambil lebar penuh viewport */
  /* overflow: hidden; */ /* Ini juga bisa dihapus jika menyebabkan masalah scroll di halaman lain */
}

.main-content-wrapper {
  flex-grow: 1; /* Penting: Membuat wrapper mengambil semua sisa ruang yang tersedia */
  /* Pada halaman login, ini akan mengisi seluruh lebar karena tidak ada sidebar */
  /* Pada halaman lain, ini akan mengisi sisa lebar setelah sidebar */

  padding: 0; /* Hapus padding default di sini. Setiap view akan punya paddingnya sendiri (misal .page-container) */
             /* Ini krusial untuk LoginView agar bisa di-center secara penuh */

  display: flex; /* Mengatur wrapper sebagai flex container */
  justify-content: center; /* Memusatkan kontennya secara horizontal */
  align-items: center; /* Memusatkan kontennya secara vertikal */

  overflow-y: auto; /* Mengizinkan scroll vertikal jika konten di dalamnya melebihi tinggi */
  overflow-x: hidden; /* Mencegah scroll horizontal yang tidak diinginkan */
}
</style>