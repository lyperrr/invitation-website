# 📝 Update Google Apps Script - PENTING!

## ⚠️ Script Lama Tidak Bisa Menampilkan Data

Script yang sebelumnya hanya bisa **menerima** data (POST), tapi tidak bisa **mengirim** data kembali (GET).

## 🔄 Update Script Dengan Kode Baru

Buka Google Apps Script editor dan **ganti semua kode** dengan yang baru ini:

```javascript
// Fungsi untuk handle POST request (submit RSVP)
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name || '-',
      data.attendance || '-',
      data.guests || '-',
      data.message || '-'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Data berhasil disimpan' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ✨ FUNGSI BARU: Handle GET request (fetch semua data)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row dan convert ke format JSON
    const submissions = data.slice(1).map((row, index) => ({
      id: index + 1,
      timestamp: row[0] ? new Date(row[0]).toLocaleString('id-ID') : '',
      name: row[1] || '',
      attendance: row[2] || '',
      guests: row[3] || '',
      message: row[4] || ''
    })).filter(item => item.name); // Filter baris kosong
    
    // Sort terbaru di atas
    submissions.reverse();
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        submissions: submissions
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false,
        message: error.toString(),
        submissions: []
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Testing POST
function testPost() {
  const testData = {
    name: "Test User",
    attendance: "hadir",
    guests: "2",
    message: "Selamat menempuh hidup baru!"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// Testing GET
function testGet() {
  const result = doGet({});
  Logger.log(result.getContent());
}
```

## 🚀 Langkah Update

### 1. Buka Apps Script Editor
- Buka Google Spreadsheet
- Extensions → Apps Script

### 2. Ganti Semua Kode
- Hapus kode lama
- Paste kode baru di atas
- **Save** (Ctrl+S)

### 3. Re-Deploy
**PENTING:** Anda harus re-deploy dengan versi baru!

1. Klik **Deploy** → **Manage deployments**
2. Klik ⚙️ (ikon gear) pada deployment yang aktif
3. Di dropdown **Version**, pilih **New version**
4. Klik **Deploy**

**URL tetap sama**, tidak perlu update di kode React!

### 4. Test Script (Opsional)
Test apakah GET berfungsi:

1. Klik dropdown function → pilih **testGet**
2. Klik **Run** (▶️)
3. Cek **Execution log** - harus muncul data JSON

## ✅ Cara Kerja

**Sebelum (Script Lama):**
- ❌ Submit → Masuk spreadsheet
- ❌ Refresh web → Data hilang (hanya localStorage)
- ❌ Tidak bisa lihat data dari user lain

**Setelah (Script Baru):**
- ✅ Submit → Masuk spreadsheet
- ✅ Refresh web → Data muncul (fetch dari spreadsheet)
- ✅ Semua user bisa lihat ucapan dari user lain
- ✅ Data sinkron real-time

## 🔍 Troubleshooting

### Data masih tidak muncul setelah refresh?

**Cek:**
1. ✅ Script sudah di-update?
2. ✅ Sudah re-deploy dengan **New version**?
3. ✅ URL masih sama di RSVP.jsx?
4. ✅ Ada data di spreadsheet (minimal 1 row + header)?
5. ✅ Buka Console browser (F12) → cek error

### Error saat fetch?

Kemungkinan CORS issue. Solusi:
- Pastikan deployment setting = **Anyone** can access
- Clear browser cache (Ctrl+Shift+Delete)

### Data ganda?

Ini normal jika ada:
- Data lama dari localStorage
- Data baru dari spreadsheet

Solusi: Clear localStorage:
```javascript
// Jalankan di Console browser (F12)
localStorage.removeItem('rsvp-submissions');
```

Lalu refresh page.

## 📊 Perubahan di React

Sudah otomatis update! Kode React sekarang:

```javascript
// Fetch data dari spreadsheet saat load
useEffect(() => {
  const loadData = async () => {
    const spreadsheetData = await fetchSubmissions();
    if (spreadsheetData.length > 0) {
      setSubmissions(spreadsheetData);
    }
  };
  loadData();
}, []);
```

---

**Setelah update script, refresh web dan semua data dari spreadsheet akan muncul!** 🎉
