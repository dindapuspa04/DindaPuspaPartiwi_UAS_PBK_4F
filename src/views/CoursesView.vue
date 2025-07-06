<template>
  <div class="courses-page">
    <div class="breadcrumb">
      
    </div>

    <div class="header-section">
      <h1 class="page-title">Manajemen Mata Pelajaran</h1>
      <span class="school-logo">School</span> </div>

    <p class="page-description">
      Halaman ini akan menampilkan semua mata pelajaran yang tersedia dan memungkinkan pengelolaannya.
    </p>

    <div class="courses-list-section">
      <h2>Daftar Mata Pelajaran Aktif</h2>
      <div v-if="courses.length === 0" class="no-courses-message">
        Belum ada mata pelajaran yang tersedia.
        <button @click="addNewCourse" class="add-button">Tambah Mata Pelajaran Baru</button>
      </div>
      <ul v-else class="course-items">
        <li v-for="course in courses" :key="course.id" class="course-item">
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
          <button @click="editCourse(course.id)" class="edit-button">Edit</button>
          <button @click="deleteCourse(course.id)" class="delete-button">Hapus</button>
        </li>
      </ul>
    </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CoursesView',
  setup() {
    // Data dummy untuk contoh
    const courses = ref([
      { id: 1, name: 'Matematika Dasar', description: 'Pengantar ke konsep-konsep matematika.' },
      { id: 2, name: 'Fisika Tingkat Lanjut', description: 'Mempelajari mekanika kuantum.' },
      { id: 3, name: 'Kimia Organik', description: 'Studi tentang senyawa karbon.' },
    ]);

    // Metode contoh (Anda akan mengisi logika nyata nanti)
    const addNewCourse = () => {
      alert('Fungsi tambah mata pelajaran baru akan datang!');
      // Logika nyata: arahkan ke halaman form tambah, atau buka modal
    };

    const editCourse = (id) => {
      alert(`Mengedit mata pelajaran dengan ID: ${id}`);
      // Logika nyata: arahkan ke halaman edit dengan ID course
    };

    const deleteCourse = (id) => {
      if (confirm(`Apakah Anda yakin ingin menghapus mata pelajaran dengan ID: ${id}?`)) {
        courses.value = courses.value.filter(course => course.id !== id);
        alert('Mata pelajaran berhasil dihapus!');
        // Logika nyata: panggil API untuk menghapus dari database
      }
    };

    onMounted(() => {
      // Anda bisa memuat data kursus dari API di sini
      console.log('CoursesView dimuat.');
    });

    return {
      courses,
      addNewCourse,
      editCourse,
      deleteCourse,
    };
  }
}
</script>

<style scoped>
/* Gaya dasar untuk halaman */
.courses-page {
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

/* Gaya untuk Bagian Daftar Mata Pelajaran */
.courses-list-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.courses-list-section h2 {
  font-size: 1.5em;
  color: #343a40;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.no-courses-message {
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

/* Gaya untuk item daftar mata pelajaran */
.course-items {
  list-style: none;
  padding: 0;
}

.course-item {
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

.course-item h3 {
  margin: 0 0 5px 0;
  color: #007bff; /* Warna biru untuk judul kursus */
}

.course-item p {
  margin: 0;
  color: #555;
  font-size: 0.95em;
}

.course-item .edit-button,
.course-item .delete-button {
  position: absolute;
  top: 15px;
  font-size: 0.8em;
  padding: 5px 10px;
}

.course-item .edit-button {
  right: 80px;
  background-color: #ffc107;
  color: #343a40;
}
.course-item .edit-button:hover {
  background-color: #e0a800;
}

.course-item .delete-button {
  right: 15px;
  background-color: #dc3545;
  color: white;
}
.course-item .delete-button:hover {
  background-color: #c82333;
}
</style>