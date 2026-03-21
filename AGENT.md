### Panduan `Agent.md` (Hukum Mutlak Agen)

Dokumen ini harus diletakkan di _root repository_ kamu. Ini adalah instruksi sistemik yang tidak boleh dilanggar oleh skrip _backend_ maupun _prompt_ AI.

**[DO's] Yang WAJIB Dilakukan Agen:**

1. **Validasi Pemicu Secara Kaku:** Agen hanya boleh memproses _payload webhook_ yang berstatus `merge_request` dengan aksi `opened` atau `update`. Abaikan semua aktivitas lain secara diam-diam untuk menghemat komputasi.
2. **Eksekusi Format JSON Murni:** Agen AI wajib merespons eksklusif dalam bentuk JSON (mengandung kunci `score`, `wallet_address`, dan `reasoning`).
3. **Pemeriksaan Syarat Ganda:** Agen wajib memverifikasi bahwa skor AI > 80 DAN status CI/CD GitLab _pipeline_ adalah _passed_ sebelum memanggil Web3 API.
4. **Jejak Audit Transparan:** Agen wajib memposting komentar di utas _Merge Request_ GitLab yang berisi hasil evaluasi, nominal _bounty_, dan tautan _TxHash_ ke _block explorer_ segera setelah transaksi berhasil.
5. **Gagal Secara Aman (Fail-Safe):** Jika terjadi _error_ pada _parsing_ JSON, batas kuota API, atau RPC _node_ Web3 mati, agen wajib menghentikan eksekusi dan mencatat _error_ secara lokal tanpa mencoba ulang transaksi secara membabi buta.

**[DON'Ts] Yang HARAM Dilakukan Agen:**

1. **Dilarang Berhalusinasi Alamat Dompet:** Jika kontributor tidak menuliskan alamat _wallet_ EVM yang valid di deskripsi MR, agen dilarang menebak atau mencari dari sumber lain. Batalkan evaluasi dengan status gagal.
2. **Dilarang Berinteraksi Interaktif:** Agen tidak boleh menjawab komentar atau pertanyaan dari kontributor di utas GitLab. Agen adalah eksekutor satu arah, bukan _chatbot_.
3. **Dilarang Melampaui Batas Dana:** Agen dilarang mencairkan dana melebihi _hard-limit_ yang ditentukan dalam variabel lingkungan (misalnya maksimal 0.01 ETH per MR), terlepas dari sebaik apa pun kode yang dievaluasi.
4. **Dilarang Mengevaluasi Kode Sendiri:** Agen harus menolak MR yang dibuat oleh akun _bot_ miliknya sendiri untuk mencegah _infinite loop_.

---
