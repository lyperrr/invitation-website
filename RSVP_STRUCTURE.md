<!-- @format -->

# 📂 RSVP Component - Struktur Modular

Struktur RSVP sudah dipecah menjadi beberapa file agar lebih mudah di-manage dan maintain.

## 📁 File Structure

```
src/
├── components/sections/
│   ├── RSVP.jsx                    # Main component (CLEAN!)
│   ├── RSVP_OLD_BACKUP.jsx        # Backup file lama (bisa dihapus)
│   └── rsvp/
│       ├── AttendanceToggle.jsx   # Toggle Hadir/Tidak Hadir
│       ├── SuccessToast.jsx       # Success notification
│       └── MessageCard.jsx        # Card untuk menampilkan ucapan
│
├── hooks/
│   └── useRSVP.js                 # Custom hook untuk semua logic RSVP
│
└── lib/
    └── rsvpApi.js                 # API functions (fetch, submit, localStorage)
```

---

## 📄 Detail Setiap File

### 1. **`RSVP.jsx`** - Main Component (170 lines)

**Isi:** UI/JSX only, tanpa logic kompleks

- Form layout
- Import sub-components
- Menggunakan `useRSVP()` hook

### 2. **`useRSVP.js`** - Custom Hook

**Isi:** Semua state management & business logic

- Form state management
- Submit handling
- Auto-refresh logic (30 detik)
- Force sync function
- Integration dengan API

**Export:**

```javascript
{
  // State
  (form,
    submissions,
    isSubmitting,
    showSuccess,
    isLoading,
    lastUpdate,
    // Actions
    updateField,
    handleAttendanceChange,
    handleSubmit,
    refreshData,
    handleForceSync,
    // Computed
    isFormValid);
}
```

### 3. **`rsvpApi.js`** - API Layer

**Isi:** Semua operasi data (fetch, submit, localStorage)

**Functions:**

- `fetchSubmissions()` - GET dari Google Spreadsheet
- `submitRSVP(formData)` - POST ke Google Spreadsheet
- `loadSubmissions()` - Load dari localStorage
- `saveSubmissions(data)` - Save ke localStorage
- `clearSubmissions()` - Clear localStorage

**Constants:**

- `SPREADSHEET_URL` - URL Google Apps Script
- `STORAGE_KEY` - Key localStorage

### 4. **`AttendanceToggle.jsx`** - Sub-component

**Isi:** Toggle button untuk pilihan Hadir/Tidak Hadir

**Props:**

- `value` - Current selection
- `onChange` - Callback function

### 5. **`SuccessToast.jsx`** - Sub-component

**Isi:** Toast notification setelah submit berhasil

### 6. **`MessageCard.jsx`** - Sub-component

**Isi:** Card untuk menampilkan ucapan dari tamu

- Line clamp 3 baris
- Expand/collapse untuk pesan panjang
- Badge status kehadiran

**Props:**

- `submission` - Data ucapan
- `index` - Index untuk animation delay

---

## 🎯 Cara Menggunakan

### Edit UI/Layout:

Edit **`RSVP.jsx`** - file ini hanya JSX, mudah dibaca

### Edit Logic/Behavior:

Edit **`useRSVP.js`** - semua logic ada di sini

### Edit API/Data Handling:

Edit **`rsvpApi.js`** - semua operasi data

### Edit Sub-component:

Edit file di folder **`rsvp/`**

---

## 🔄 Flow Data

```
User Action (RSVP.jsx)
    ↓
useRSVP Hook
    ↓
rsvpApi Functions
    ↓
Google Spreadsheet / localStorage
    ↓
useRSVP Hook (update state)
    ↓
RSVP.jsx (re-render)
```

---

## ✅ Keuntungan Struktur Ini

1. **Separation of Concerns** - UI, Logic, Data terpisah
2. **Reusable** - Hook & API bisa dipakai di component lain
3. **Testable** - Setiap function bisa di-test terpisah
4. **Maintainable** - Mudah cari & edit code
5. **Readable** - File kecil-kecil, mudah dibaca
6. **Scalable** - Mudah tambah fitur baru

---

## 🛠️ Contoh Edit

### Ubah interval auto-refresh dari 30 detik ke 10 detik:

**File:** `src/hooks/useRSVP.js`

```javascript
// Cari baris ini:
}, 30000); // 30 seconds

// Ubah jadi:
}, 10000); // 10 seconds
```

### Ubah URL Spreadsheet:

**File:** `src/lib/rsvpApi.js`

```javascript
export const SPREADSHEET_URL = "YOUR_NEW_URL_HERE";
```

### Tambah field baru (contoh: "Email"):

1. **Update API** (`rsvpApi.js`) - tambah ke POST body
2. **Update Hook** (`useRSVP.js`) - tambah ke INITIAL_FORM
3. **Update UI** (`RSVP.jsx`) - tambah Input component

---

## 🗑️ File yang Bisa Dihapus

- `RSVP_OLD_BACKUP.jsx` - Backup file lama (optional)
- `RSVP_CLEAN.jsx` - Template yang sudah di-copy (optional)

---

## 📚 Dependencies

**UI Components:**

- `@/components/ui/*` - shadcn/ui components
- `lucide-react` - Icons

**React Hooks:**

- `useState`, `useEffect`, `useCallback`

---

**Struktur ini membuat code lebih clean, maintainable, dan professional!** 🎉
