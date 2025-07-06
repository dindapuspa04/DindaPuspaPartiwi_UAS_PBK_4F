<template>
  <div class="assignments-page">
    <div class="breadcrumb">
      
    </div>

    <div class="header-section">
      <h1 class="page-title">Manajemen Tugas</h1>
      <span class="school-logo">School</span>
    </div>

    <p class="page-description">
      Halaman ini akan memungkinkan pembuatan dan pengelolaan tugas/tes.
    </p>

    <div class="assignments-list-section">
      <h2>Daftar Tugas Aktif</h2>
      <div v-if="assignments.length === 0" class="no-assignments-message">
        Belum ada tugas yang terdaftar.
        <button @click="addNewAssignment" class="add-button">Buat Tugas Baru</button>
      </div>
      <ul v-else class="assignment-items">
        <li v-for="assignment in assignments" :key="assignment.id" class="assignment-item">
          <h3>{{ assignment.title }}</h3>
          <p>Mata Pelajaran: {{ assignment.course }}</p>
          <p>Batas Waktu: {{ assignment.dueDate }}</p>
          <p>Status: {{ assignment.status }}</p>
          <button @click="editAssignment(assignment.id)" class="edit-button">Edit</button>
          <button @click="deleteAssignment(assignment.id)" class="delete-button">Hapus</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AssignmentsView',
  setup() {
    // Data dummy untuk contoh tugas
    const assignments = ref([
      { id: 1, title: 'Tugas Aljabar Linear', course: 'Matematika Dasar', dueDate: '2025-07-15', status: 'Aktif' },
      { id: 2, title: 'Kuis Fisika Bab 3', course: 'Fisika Tingkat Lanjut', dueDate: '2025-07-20', status: 'Mendatang' },
      { id: 3, title: 'Laporan Kimia Organik', course: 'Kimia Organik', dueDate: '2025-07-25', status: 'Selesai' },
      { id: 4, title: 'Ujian Akhir Sejarah', course: 'Sejarah', dueDate: '2025-08-01', status: 'Aktif' },
      { id: 5, title: 'Esai Bahasa Indonesia', course: 'Bahasa Indonesia', dueDate: '2025-07-10', status: 'Mendatang' },
    ]);

    // Metode contoh
    const addNewAssignment = () => {
      alert('Fungsi buat tugas baru akan datang!');
      // Logika nyata: arahkan ke halaman form tambah, atau buka modal
    };

    const editAssignment = (id) => {
      alert(`Mengedit tugas dengan ID: ${id}`);
      // Logika nyata: arahkan ke halaman edit dengan ID tugas
    };

    const deleteAssignment = (id) => {
      if (confirm(`Apakah Anda yakin ingin menghapus tugas dengan ID: ${id}?`)) {
        assignments.value = assignments.value.filter(assignment => assignment.id !== id);
        alert('Tugas berhasil dihapus!');
        // Logika nyata: panggil API untuk menghapus dari database
      }
    };

    onMounted(() => {
      // Anda bisa memuat data tugas dari API di sini
      console.log('AssignmentsView dimuat.');
    });

    return {
      assignments,
      addNewAssignment,
      editAssignment,
      deleteAssignment,
    };
  }
}
</script>

<style scoped>
/* Gaya dasar untuk halaman */
.assignments-page {
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

/* Gaya untuk Bagian Daftar Tugas */
.assignments-list-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.assignments-list-section h2 {
  font-size: 1.5em;
  color: #343a40;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.no-assignments-message {
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

/* Gaya untuk item daftar tugas */
.assignment-items {
  list-style: none;
  padding: 0;
}

.assignment-item {
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

.assignment-item h3 {
  margin: 0 0 5px 0;
  color: #007bff; /* Warna biru untuk judul tugas */
}

.assignment-item p {
  margin: 0;
  color: #555;
  font-size: 0.95em;
}

.assignment-item .edit-button,
.assignment-item .delete-button {
  position: absolute;
  top: 15px;
  font-size: 0.8em;
  padding: 5px 10px;
}

.assignment-item .edit-button {
  right: 80px;
  background-color: #ffc107;
  color: #343a40;
}
.assignment-item .edit-button:hover {
  background-color: #e0a800;
}

.assignment-item .delete-button {
  right: 15px;
  background-color: #dc3545;
  color: white;
}
.assignment-item .delete-button:hover {
  background-color: #c82333;
}
</style>