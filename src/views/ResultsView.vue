<template>
  <div class="results-page">
    <div class="breadcrumb">
      
    </div>

    <div class="header-section">
      <h1 class="page-title">Hasil Tes</h1>
      <span class="school-logo">School</span>
    </div>

    <p class="page-description">
      Halaman ini akan menampilkan hasil tes siswa.
    </p>

    <div class="results-list-section">
      <h2>Daftar Hasil Tes Aktif</h2>
      <div v-if="results.length === 0" class="no-results-message">
        Belum ada hasil tes yang terdaftar.
      </div>
      <ul v-else class="result-items">
        <li v-for="result in results" :key="result.id" class="result-item">
          <div class="result-info"> <h3>{{ result.studentName }} - {{ result.testName }}</h3>
            <p>Mata Pelajaran: {{ result.course }}</p>
            <p>Tanggal: {{ result.testDate }}</p>
            <p>Nilai: {{ result.score }}</p>
          </div>
          <div class="result-actions"> <button @click="viewResult(result.id)" class="action-button view-button">Lihat</button>
            <button @click="deleteResult(result.id)" class="action-button delete-button">Hapus</button>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ResultsView',
  setup() {
    // Data dummy untuk contoh hasil tes
    const results = ref([
      { id: 1, studentName: 'Siswa A', testName: 'Kuis Aljabar', course: 'Matematika Dasar', testDate: '2025-07-01', score: 85 },
      { id: 2, studentName: 'Siswa B', testName: 'Ujian Mekanika', course: 'Fisika Tingkat Lanjut', testDate: '2025-07-02', score: 60 },
      { id: 3, studentName: 'Siswa C', testName: 'Tes Reaksi Kimia', course: 'Kimia Organik', testDate: '2025-07-03', score: 92 },
      { id: 4, studentName: 'Siswa D', testName: 'Latihan Sejarah', course: 'Sejarah', testDate: '2025-07-04', score: 75 },
      { id: 5, studentName: 'Siswa E', testName: 'Tes Tata Bahasa', course: 'Bahasa Indonesia', testDate: '2025-07-05', score: 45 },
    ]);

    // Metode contoh
    const viewResult = (id) => {
      alert(`Melihat detail hasil tes dengan ID: ${id}`);
      // Logika nyata: arahkan ke halaman detail hasil tes
    };

    const deleteResult = (id) => {
      if (confirm(`Apakah Anda yakin ingin menghapus hasil tes siswa dengan ID: ${id}?`)) {
        results.value = results.value.filter(result => result.id !== id);
        alert('Hasil tes berhasil dihapus!');
        // Logika nyata: panggil API untuk menghapus dari database
      }
    };

    onMounted(() => {
      // Anda bisa memuat data hasil tes dari API di sini
      console.log('ResultsView dimuat.');
    });

    return {
      results,
      viewResult,
      deleteResult,
    };
  }
}
</script>

<style scoped>
/* Gaya dasar untuk halaman */
.results-page {
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

/* Gaya untuk Bagian Daftar Hasil Tes */
.results-list-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.results-list-section h2 {
  font-size: 1.5em;
  color: #343a40;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.no-results-message {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin-bottom: 20px;
}

/* Gaya untuk Tombol Umum */
/* Menggunakan nama kelas yang lebih umum untuk konsistensi */
.action-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
  /* margin-left: 10px; Hapus ini karena kita akan pakai flexbox gap atau align */
}

.add-button {
  background-color: #007bff;
  color: white;
  margin-top: 15px;
}
.add-button:hover {
  background-color: #0056b3;
}

/* Gaya untuk item daftar hasil tes */
.result-items {
  list-style: none;
  padding: 0;
}

.result-item {
  background-color: #fefefe;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px 20px;
  display: flex; /* Gunakan flexbox untuk layout horizontal */
  justify-content: space-between; /* Untuk mendorong info ke kiri, tombol ke kanan */
  align-items: flex-start; /* Sejajarkan item ke atas */
  position: relative; /* Tetap relatif jika Anda ingin absolute di dalamnya, tapi kita akan pakai flex */
  gap: 20px; /* Memberi jarak antara info dan tombol */
}

.result-info { /* Gaya untuk container informasi (teks) */
  flex-grow: 1; /* Biarkan informasi mengisi ruang sebanyak mungkin */
  display: flex;
  flex-direction: column;
  gap: 8px; /* Jarak vertikal antar paragraf */
}

.result-actions { /* Gaya untuk container tombol aksi */
  display: flex;
  flex-direction: column; /* Tombol akan bertumpuk vertikal */
  gap: 8px; /* Jarak vertikal antar tombol */
  align-items: flex-end; /* Sejajarkan tombol ke kanan di dalam wadahnya */
  min-width: 90px; /* Memberi lebar minimum agar tombol tidak terlalu sempit */
}


.result-item h3 {
  margin: 0 0 5px 0;
  color: #007bff; /* Warna biru untuk judul hasil tes */
}

.result-item p {
  margin: 0;
  color: #555;
  font-size: 0.95em;
}

/* Hapus aturan position: absolute dari tombol */
/* .result-item .edit-button,
.result-item .delete-button {
  position: absolute;
  top: 15px;
  font-size: 0.8em;
  padding: 5px 10px;
} */

/* Definisikan gaya untuk tombol Lihat dan Hapus secara terpisah */
.view-button { /* Menggunakan kelas view-button */
  background-color: #ffc107; /* Warna kuning seperti edit button di teacher */
  color: #343a40;
}
.view-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}
.delete-button:hover {
  background-color: #c82333;
}
</style>