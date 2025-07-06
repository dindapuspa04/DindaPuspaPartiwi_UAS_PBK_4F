# CBT MATH - Sistem Manajemen Tes Berbasis Komputer

![Project Screenshot Placeholder]
Sistem Manajemen Tes Berbasis Komputer (CBT) ini adalah aplikasi *Single Page Application (SPA)* yang dikembangkan menggunakan **Vue.js 3** dan **Vite**. Dirancang untuk memfasilitasi administrasi dan pengelolaan mata pelajaran, guru, tugas, pertanyaan, dan hasil tes dalam lingkungan pendidikan. Proyek ini juga mengintegrasikan **JSON Server** sebagai API mock, **Pinia** untuk manajemen state global, dan **Vitest** untuk pengujian unit.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [Rute Halaman](#rute-halaman)
- [API Endpoints](#api-endpoints)
- [Manajemen State (Pinia)](#manajemen-state-pinia)
- [Unit Testing (Vitest)](#unit-testing-vitest)
- [Status Pengembangan](#status-pengembangan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Fitur Utama

Aplikasi CBT MATH menyediakan fungsionalitas inti untuk mengelola berbagai aspek sistem tes berbasis komputer:

* **Dashboard Interaktif**: Menyajikan ringkasan visual dan statistik penting sistem (total mata pelajaran, guru, tugas, pertanyaan, dll.).
* **Autentikasi Pengguna**: Sistem login dan logout sederhana untuk mengelola akses pengguna (Admin/Guru).
* **Manajemen Mata Pelajaran (CRUD)**:
    * Melihat daftar mata pelajaran dengan tampilan kartu yang modern, berwarna, dan informatif.
    * Menambah, Mengedit, dan Menghapus detail mata pelajaran.
* **Manajemen Guru (CRUD)**:
    * Melihat daftar guru yang terdaftar dengan informasi relevan.
    * Menambah, Mengedit, dan Menghapus akun guru.
* **Manajemen Tugas (CRUD)**:
    * Melihat daftar tugas/tes dengan detail seperti mata pelajaran, batas waktu, dan status.
    * Membuat, Mengedit, dan Menghapus tugas.
* **Manajemen Pertanyaan (CRUD)**:
    * Melihat, Menambah, Mengedit, dan Menghapus pertanyaan untuk bank soal.
* **Manajemen Hasil Tes (Read & Delete)**:
    * Menampilkan ringkasan hasil tes siswa.
    * Melihat detail dan menghapus data hasil tes.
* **Tata Letak Responsif**: Desain aplikasi beradaptasi dengan berbagai ukuran layar perangkat, mulai dari desktop hingga mobile.
* **Navigasi Sidebar**: Menu navigasi yang intuitif dan mudah diakses untuk berpindah antar modul.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi-teknologi frontend modern:

* **Framework Frontend**: [Vue.js 3](https://vuejs.org/) (Composition API)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Routing**: [Vue Router](https://router.vuejs.org/)
* **State Management**: [Pinia](https://pinia.vuejs.org/)
* **Testing Framework**: [Vitest](https://vitest.dev/)
* **Testing Utilities**: [@vue/test-utils](https://test-utils.vuejs.org/), [jsdom](https://github.com/jsdom/jsdom)
* **API Mocking**: [JSON Server](https://github.com/typicode/json-server)
* **HTTP Client**: [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (bawaan browser, atau dapat diganti dengan [Axios](https://axios-http.com/) jika diinginkan)
* **Bahasa Pemrograman**: JavaScript (ES6+)
* **Styling**: HTML5 & CSS3 (dengan Scoped CSS)

## Prasyarat

Pastikan Anda memiliki perangkat lunak berikut terinstal di sistem Anda sebelum memulai:

* **Node.js**: Versi 14.x atau lebih tinggi (disarankan versi LTS terbaru). Anda bisa mengunduhnya dari [nodejs.org](https://nodejs.org/).
* **Manajer Paket**:
    * [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js)
    * Atau [Yarn](https://yarnpkg.com/)
    * Atau [pnpm](https://pnpm.io/)

## Instalasi

Ikuti langkah-langkah di bawah ini untuk menginstal dan menyiapkan proyek di lingkungan lokal Anda:

1.  **Kloning repositori proyek:**
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    # Contoh: git clone [https://github.com/nama-pengguna-anda/cbt-math-frontend.git](https://github.com/nama-pengguna-anda/cbt-math-frontend.git)
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd cbt-math-frontend
    ```
3.  **Instal semua dependensi proyek:**
    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```
4.  **Instal JSON Server secara global:**
    ```bash
    npm install -g json-server
    # atau
    yarn global add json-server
    # atau
    pnpm add -g json-server
    ```

## Menjalankan Aplikasi

Aplikasi ini memerlukan dua proses terpisah untuk berjalan: frontend Vue.js dan API mock JSON Server.

1.  **Jalankan API Mock (JSON Server):**
    Buka terminal **baru** (selain terminal proyek utama) dan jalankan perintah berikut di root direktori proyek Anda:
    ```bash
    json-server --watch db.json --port 3000
    ```
    API akan tersedia di `http://localhost:3000/`. Pastikan ini berjalan sebelum menjalankan frontend.

2.  **Jalankan Aplikasi Frontend (Vite):**
    Di terminal **utama** (di root direktori proyek Anda), jalankan perintah berikut:
    ```bash
    npm run dev
    # atau
    yarn dev
    # atau
    pnpm dev
    ```
    Aplikasi frontend akan berjalan di `http://localhost:5173/` (atau port lain yang mungkin ditampilkan di terminal). Buka URL tersebut di browser Anda.

## API Endpoints

Aplikasi ini berinteraksi dengan API mock JSON Server yang berjalan di http://localhost:3000/. Berikut adalah daftar endpoint utama yang digunakan:

Users:

GET /users: Mengambil data pengguna (digunakan untuk mock login).

Courses:

GET /courses: Mengambil semua data mata pelajaran.

POST /courses: Menambah mata pelajaran.

PUT /courses/:id: Mengedit mata pelajaran.

DELETE /courses/:id: Menghapus mata pelajaran.

Teachers:

GET /teachers: Mengambil semua data guru.

POST /teachers: Menambah guru.

PUT /teachers/:id: Mengedit guru.

DELETE /teachers/:id: Menghapus guru.

Assignments:

GET /assignments: Mengambil semua data tugas.

POST /assignments: Menambah tugas.

PUT /assignments/:id: Mengedit tugas.

DELETE /assignments/:id: Menghapus tugas.

Results:

GET /results: Mengambil semua data hasil tes.

DELETE /results/:id: Menghapus hasil tes.

Questions:

GET /questions: Mengambil semua data pertanyaan.

POST /questions: Menambah pertanyaan.

PUT /questions/:id: Mengedit pertanyaan.

DELETE /questions/:id: Menghapus pertanyaan.

Bagian ini sudah secara komprehensif mencantumkan semua endpoint API yang relevan dengan operasi CRUD untuk setiap entitas data yang dikelola oleh aplikasi, serta endpoint untuk data pengguna (untuk keperluan login mock). Tidak ada informasi API lain yang perlu ditambahkan berdasarkan diskusi kita.
**Untuk membuat versi produksi (build):**
```bash
npm run build
# atau
yarn build
# atau
pnpm build