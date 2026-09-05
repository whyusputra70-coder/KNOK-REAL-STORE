KNOK REAL STORE — FULL ADMIN SYSTEM

FITUR:
- Tampilan publik mobile bergaya screenshot referensi (hitam/ungu).
- Tombol Beli membuka popup konfirmasi.
- Tombol WA MIMIN membuka WhatsApp.
- /admin = login admin.
- Admin dapat mengubah nama, tagline, hero, notice, footer, warna, WhatsApp, QRIS, produk, harga, badge, deskripsi, emoji, gambar produk.
- Tambah/hapus produk.
- Perubahan tersimpan di server melalui data/store.json.
- Upload gambar disimpan di uploads/.

CARA JALANKAN:
1. Install Node.js.
2. Buka folder project di terminal.
3. Jalankan: npm install
4. Jalankan: npm start
5. Buka http://localhost:3000
6. Admin: http://localhost:3000/admin
7. Password default: KNOKADMIN

UNTUK ONLINE:
Upload project ke server/hosting yang mendukung Node.js dan penyimpanan persisten.
Set environment:
ADMIN_PASSWORD=PASSWORD_KAMU
SESSION_SECRET=RAHASIA_PANJANG
Jangan gunakan password default di website publik.

CATATAN:
Versi ini sudah memakai autentikasi server-side sederhana, bukan localStorage untuk data utama. Untuk keamanan produksi tingkat lanjut, gunakan HTTPS dan secret yang kuat.
