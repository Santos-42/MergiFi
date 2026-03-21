### Spesifikasi Frontend MVP (Ultra-Minimalis)

Fokus utama aplikasi ini ada di GitLab. _Frontend_ yang kamu minta ini hanya berfungsi sebagai panel kontrol _read-only_ untukmu (Admin) dan etalase informasi bagi juri. Jangan gunakan _state management_ yang rumit. Gunakan Next.js dengan Tailwind CSS untuk kecepatan.

**Nama Brand:** MergiFi

**Aturan Desain Sesuai PRD:**

- Teks utama wajib menggunakan `Geist Mono` atau `JetBrains Mono`.

#### 1. Halaman Awal (Landing Page / Panduan)

Ini adalah halaman statis murni yang bisa diakses publik (dan juri).

- **Hero Section:** Judul proyek tebal (misal "GitLab Web3 Bounty Agent"), subjudul penjelasan satu kalimat, dan tombol "Login Admin" di sudut kanan atas.
- **Cara Kerja (How It Works):** Tampilkan tiga langkah sederhana dalam bentuk kartu vertikal.
  - _Langkah 1:_ Developer _submit Merge Request_ dengan alamat _wallet_.
  - _Langkah 2:_ DeepSeek AI mengevaluasi _diff_ kode dan memberikan skor.
  - _Langkah 3:_ Smart Contract mencairkan dana jika skor memenuhi standar.
- **Aturan Kontributor:** Daftar singkat berpoin tentang apa yang membuat kode dinilai tinggi oleh AI (dokumentasi, tidak ada kode berulang, efisiensi).

#### 2. Layar Autentikasi (Login)

- Form super sederhana di tengah layar.
- Hanya berisi input Email, Password, dan tombol Submit.
- Jangan buang waktu membuat fitur "Register" atau "Forgot Password" untuk versi MVP ini. _Hardcode_ saja kredensial admin di _environment variables_ atau gunakan _database_ lokal sederhana.

#### 3. Halaman Fitur Utama (Admin Dashboard)

Ini adalah halaman terproteksi setelah login. Halaman ini hanya membaca data dari tabel `processed_mrs` dan `bounty_transactions` yang ada di _database_ lokalmu.

- **Top Metric Bar:**
  - Total _Merge Request_ Dievaluasi.
  - Total Dana _Bounty_ Dicairkan.
  - Tingkat Kelulusan AI (Persentase MR yang skornya > 80).
- **Live Log Table (Tabel Riwayat):**
  - Kolom: Waktu, ID MR, Skor AI, Status Transaksi (Sukses/Gagal), dan Tautan TxHash.
- **Aksi:** Tidak ada tombol aksi kompleks di sini. Sistem berjalan otomatis di _background_. Dashboard ini hanya untuk memonitor bahwa agenmu tidak bertindak liar.
