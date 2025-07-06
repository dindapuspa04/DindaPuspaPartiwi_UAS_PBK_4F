// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Jalur impor yang sudah diperbaiki

import './assets/style.css'; // Gaya global

const app = createApp(App);
const pinia = createPinia();

// PENTING: Pinia harus diinisialisasi SEBELUM Router jika Router menggunakan Store di guard-nya
app.use(pinia);
app.use(router);

app.mount('#app');