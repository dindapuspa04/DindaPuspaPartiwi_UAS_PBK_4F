<template>
  <div class="teachers-page">
    <div class="breadcrumb">
      Home / Teachers
    </div>

    <div class="header-section">
      <h1 class="page-title">Manajemen Guru</h1>
      <span class="school-logo">School</span> </div>

    <p class="page-description">
      Halaman ini akan memungkinkan pengelolaan akun guru.
    </p>

    <div class="teachers-list-section">
      <h2>Daftar Guru Aktif</h2>
      <div v-if="teachers.length === 0" class="no-teachers-message">
        Belum ada guru yang terdaftar.
        <button @click="addNewTeacher" class="add-button">Tambah Guru Baru</button>
      </div>
      <ul v-else class="teacher-items">
        <li v-for="teacher in teachers" :key="teacher.id" class="teacher-item">
          <h3>{{ teacher.name }}</h3>
          <p>Mata Pelajaran: {{ teacher.subject }}</p>
          <p>Email: {{ teacher.email }}</p>
          <button @click="editTeacher(teacher.id)" class="edit-button">Edit</button>
          <button @click="deleteTeacher(teacher.id)" class="delete-button">Hapus</button>
        </li>
      </ul>
    </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'TeachersView',
  setup() {
    // Data dummy untuk contoh
    const teachers = ref([
      { id: 1, name: 'Budi Santoso', subject: 'Matematika', email: 'budi.s@school.com' },
      { id: 2, name: 'Citra Dewi', subject: 'Fisika', email: 'citra.d@school.com' },
      { id: 3, name: 'Andi Wijaya', subject: 'Kimia', email: 'andi.w@school.com' },
    ]);

    // Metode contoh (Anda akan mengisi logika nyata nanti)
    const addNewTeacher = () => {
      alert('Fungsi tambah guru baru akan datang!');
      // Logika nyata: arahkan ke halaman form tambah, atau buka modal
    };

    const editTeacher = (id) => {
      alert(`Mengedit guru dengan ID: ${id}`);
      // Logika nyata: arahkan ke halaman edit dengan ID guru
    };

    const deleteTeacher = (id) => {
      if (confirm(`Apakah Anda yakin ingin menghapus guru dengan ID: ${id}?`)) {
        teachers.value = teachers.value.filter(teacher => teacher.id !== id);
        alert('Guru berhasil dihapus!');
        // Logika nyata: panggil API untuk menghapus dari database
      }
    };

    onMounted(() => {
      // Anda bisa memuat data guru dari API di sini
      console.log('TeachersView dimuat.');
    });

    return {
      teachers,
      addNewTeacher,
      editTeacher,
      deleteTeacher,
    };
  }
}
</script>

<style scoped>
/* Gaya dasar untuk halaman */
.teachers-page {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Gaya untuk Breadcrumb */
.breadcrumb {
  font-size: 0.9em;
  color: #6c757d;
  margin-bottom: 15px;
}

/* Gaya untuk Header Utama */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 2em;
  color: #343a40;
  margin: 0;
}

.school-logo {
  font-weight: bold;
  color: #28a745; /* Contoh warna hijau */
}

/* Gaya untuk Deskripsi Halaman */
.page-description {
  font-size: 1em;
  color: #495057;
  margin-bottom: 30px;
}

/* Gaya untuk Bagian Daftar Guru */
.teachers-list-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.teachers-list-section h2 {
  font-size: 1.5em;
  color: #343a40;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.no-teachers-message {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin-bottom: 20px;
}

/* Gaya untuk Tombol Umum */
.add-button, .edit-button, .delete-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
  margin-left: 10px; /* Jarak antar tombol */
}

.add-button {
  background-color: #007bff;
  color: white;
  margin-top: 15px;
}
.add-button:hover {
  background-color: #0056b3;
}

/* Gaya untuk item daftar guru */
.teacher-items {
  list-style: none;
  padding: 0;
}

.teacher-item {
  background-color: #fefefe;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative; /* Untuk posisi tombol */
}

.teacher-item h3 {
  margin: 0 0 5px 0;
  color: #007bff; /* Warna biru untuk judul guru */
}

.teacher-item p {
  margin: 0;
  color: #555;
  font-size: 0.95em;
}

.teacher-item .edit-button,
.teacher-item .delete-button {
  position: absolute;
  top: 15px;
  font-size: 0.8em;
  padding: 5px 10px;
}

.teacher-item .edit-button {
  right: 80px;
  background-color: #ffc107;
  color: #343a40;
}
.teacher-item .edit-button:hover {
  background-color: #e0a800;
}

.teacher-item .delete-button {
  right: 15px;
  background-color: #dc3545;
  color: white;
}
.teacher-item .delete-button:hover {
  background-color: #c82333;
}
</style>