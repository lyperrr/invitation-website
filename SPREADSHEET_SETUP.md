<!-- @format -->

# 📊 Setup Google Spreadsheet untuk RSVP

Panduan lengkap untuk mengintegrasikan form RSVP dengan Google Spreadsheet.

---

## 📋 Langkah 1: Buat Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **+ Blank** untuk membuat spreadsheet baru
3. Beri nama spreadsheet, misalnya: `RSVP Wedding - [Nama Pengantin]`
4. Buat header kolom di baris pertama:

| A             | B        | C             | D               | E         |
| ------------- | -------- | ------------- | --------------- | --------- |
| **Timestamp** | **Nama** | **Kehadiran** | **Jumlah Tamu** | **Pesan** |

5. Format kolom A sebagai tanggal/waktu:
   - Pilih kolom A
   - Klik **Format → Number → Date time**

---

## 🔧 Langkah 2: Buat Google Apps Script

### 2.1 Buka Apps Script Editor

1. Di spreadsheet yang sudah dibuat, klik menu **Extensions**
2. Pilih **Apps Script**
3. Browser akan membuka tab baru dengan editor

### 2.2 Paste Kode Script

Hapus semua kode default, lalu paste kode berikut:

```javascript
function doPost(e) {
  try {
    // Ambil sheet pertama (atau ganti dengan nama sheet spesifik)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse data dari request
    const data = JSON.parse(e.postData.contents);

    // Tambahkan data ke baris baru
    sheet.appendRow([
      new Date(), // Timestamp otomatis
      data.name || "-", // Nama
      data.attendance || "-", // Kehadiran (hadir/tidak_hadir)
      data.guests || "-", // Jumlah Tamu
      data.message || "-", // Pesan/Ucapan
    ]);

    // Response sukses
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data berhasil disimpan",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Response error
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Fungsi untuk testing
function testScript() {
  const testData = {
    name: "Test User",
    attendance: "hadir",
    guests: "2",
    message: "Selamat menempuh hidup baru!",
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

### 2.3 Simpan Script

1. Klik ikon **💾 Save** atau tekan `Ctrl+S`
2. Beri nama project, misalnya: `RSVP Webhook`
3. Klik **OK**

---

## 🚀 Langkah 3: Deploy Web App

### 3.1 Deploy Script

1. Klik tombol **Deploy** di kanan atas
2. Pilih **New deployment**
3. Klik ikon ⚙️ (gear) di samping "Select type"
4. Pilih **Web app**

### 3.2 Konfigurasi Deployment

Isi konfigurasi sebagai berikut:

- **Description**: `RSVP Form Integration` (opsional)
- **Execute as**: Pilih **Me** (email@gmail.com)
- **Who has access**: Pilih **Anyone**

⚠️ **Penting**: Pilih "Anyone" agar form bisa submit tanpa login Google

### 3.3 Authorize Script

1. Klik **Deploy**
2. Akan muncul popup "Authorization required"
3. Klik **Authorize access**
4. Pilih akun Google Anda

**⚠️ PENTING: Akan muncul warning "Google hasn't verified this app"**

Ini **NORMAL** dan **AMAN** karena Anda adalah pembuat script-nya sendiri.

**Cara bypass warning:**

5. **Jangan klik "BACK TO SAFETY"**
6. Klik link **"Advanced"** di kiri bawah
7. Klik link **"Go to RSVP Webhook (unsafe)"** yang muncul
8. Klik **"Allow"** untuk memberikan permission

### 3.4 Copy Web App URL

1. Setelah authorization, akan muncul deployment URL
2. Copy **Web app URL** yang berbentuk:
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxx/exec
   ```
3. ⭐ **Simpan URL ini!** Akan digunakan di langkah berikutnya

---

## 💻 Langkah 4: Update Kode React

### 4.1 Buka File RSVP.jsx

Buka file: `src/components/sections/RSVP.jsx`

### 4.2 Ganti URL Spreadsheet

Cari baris kode berikut (sekitar baris 29):

```javascript
const SPREADSHEET_URL = "PASTE_YOUR_WEB_APP_URL_HERE";
```

Ganti dengan Web App URL yang sudah di-copy:

```javascript
const SPREADSHEET_URL =
  "https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxx/exec";
```

### 4.3 Simpan File

Tekan `Ctrl+S` untuk menyimpan perubahan.

---

## 🧪 Langkah 5: Testing

### 5.1 Jalankan Development Server

```bash
npm run dev
```

### 5.2 Test Form

1. Buka website di browser
2. Scroll ke section RSVP
3. Isi form:
   - **Nama**: `Test User`
   - **Kehadiran**: Pilih salah satu
   - **Jumlah Tamu**: Pilih jumlah (jika hadir)
   - **Pesan**: `Testing spreadsheet integration`
4. Klik **Kirim RSVP**

### 5.3 Cek Spreadsheet

1. Buka Google Spreadsheet
2. Refresh halaman
3. Data baru harus muncul di baris paling bawah

---

## 🔍 Troubleshooting

### Problem: "Maaf, terjadi kesalahan"

**Solusi:**

- Pastikan URL Web App sudah benar
- Cek authorization di Apps Script (re-deploy jika perlu)
- Pastikan "Who has access" diset ke **Anyone**

### Problem: Data tidak muncul di Spreadsheet

**Solusi:**

1. Buka Apps Script Editor
2. Klik **Executions** di sidebar kiri
3. Cek error log di sana
4. Pastikan format JSON yang dikirim benar

### Problem: CORS Error

**Solusi:**

- Kode sudah menggunakan `mode: "no-cors"` - ini normal untuk Apps Script
- Error CORS tidak akan mengganggu functionality

### Problem: Button loading terus

**Solusi:**

- Cek console browser (`F12` → Console)
- Pastikan tidak ada JavaScript error
- Cek network tab untuk melihat status request

---

## 🔄 Update Deployment (Jika Ada Perubahan Script)

Jika Anda mengubah kode Apps Script:

1. Buka Apps Script Editor
2. Klik **Deploy** → **Manage deployments**
3. Klik ⚙️ pada deployment yang aktif
4. Klik **Version** → **New version**
5. Klik **Deploy**

URL tetap sama, tidak perlu update di kode React.

---

## 📊 Tips & Best Practices

### 1. Backup Data

- Buat copy spreadsheet secara berkala
- File → Make a copy

### 2. Limit Akses Spreadsheet

- Share spreadsheet hanya ke orang yang perlu akses
- Jangan share Web App URL ke publik

### 3. Validasi Data

- Tambahkan data validation di spreadsheet:
  - Kolom C (Kehadiran): List = `hadir, tidak_hadir`
  - Kolom D (Jumlah): Number between 1-10

### 4. Auto-Sort Data

Tambahkan formula di Apps Script untuk auto-sort by timestamp:

```javascript
// Tambahkan setelah appendRow
const lastRow = sheet.getLastRow();
sheet.getRange(2, 1, lastRow - 1, 5).sort({ column: 1, ascending: false });
```

### 5. Notifikasi Email

Tambahkan kode untuk mendapat email setiap ada RSVP baru:

```javascript
// Tambahkan setelah appendRow
MailApp.sendEmail({
  to: "your-email@gmail.com",
  subject: "RSVP Baru: " + data.name,
  body: `Nama: ${data.name}\nKehadiran: ${data.attendance}\nPesan: ${data.message}`,
});
```

### 6. Rate Limiting

Untuk mencegah spam, tambahkan di Apps Script:

```javascript
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds

  try {
    // ... existing code ...
  } finally {
    lock.releaseLock();
  }
}
```

---

## 📞 Support

Jika mengalami kesulitan:

1. Cek [Google Apps Script Documentation](https://developers.google.com/apps-script)
2. Cek console browser untuk error messages
3. Test dengan `testScript()` function di Apps Script

---

## ✅ Checklist

- [ ] Google Spreadsheet dibuat dengan header yang benar
- [ ] Apps Script code sudah di-paste dan di-save
- [ ] Web App sudah di-deploy dengan akses "Anyone"
- [ ] URL Web App sudah di-copy
- [ ] URL sudah di-update di `RSVP.jsx`
- [ ] Testing berhasil - data masuk ke spreadsheet
- [ ] Form reset setelah submit
- [ ] Alert/notification muncul setelah submit

---

**🎉 Selamat! Integrasi Google Spreadsheet sudah berhasil!**
