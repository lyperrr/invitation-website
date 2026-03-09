# URL Parameter untuk Nama Tamu

## 📝 Cara Penggunaan

### Format URL

Gunakan parameter `to` atau `name` di URL untuk mengirim nama tamu:

```
https://your-website.com/?to=John%20Doe
https://your-website.com/?name=Jane%20Smith
```

### Contoh URL

1. **Nama dengan spasi:**
   ```
   ?to=Bapak%20Ahmad%20Sulaiman
   ```
   
2. **Nama sederhana:**
   ```
   ?to=Sarah
   ```

3. **Nama lengkap dengan gelar:**
   ```
   ?to=Dr.%20Budi%20Santoso,%20M.Kom
   ```

### Encoding URL

Nama akan otomatis di-encode oleh browser. Contoh:
- Spasi → `%20`
- Koma → `%2C`
- Ampersand (&) → `%26`

## 🎯 Fitur

### 1. Welcome Page
Nama dari URL akan ditampilkan di bagian **"Tamu Undangan"** menggantikan teks default.

```jsx
// Default (tanpa URL param):
"Tamu Undangan"

// Dengan URL ?to=Ahmad:
"Ahmad"
```

### 2. RSVP Form
Input nama di form RSVP akan **otomatis terisi** dengan nama dari URL.

- ✅ Auto-fill saat halaman dibuka
- ✅ Nama tetap di form setelah submit (sticky)
- ✅ User masih bisa edit nama jika perlu

## 🔧 Generate URL untuk Tamu

### Manual
```javascript
const guestName = "Bapak Ahmad Sulaiman";
const url = `https://your-website.com/?to=${encodeURIComponent(guestName)}`;
// Hasil: https://your-website.com/?to=Bapak%20Ahmad%20Sulaiman
```

### Bulk dengan Excel/Spreadsheet

Jika punya daftar tamu di Excel:

| Nama Tamu | URL |
|-----------|-----|
| Ahmad | `=HYPERLINK("https://your-site.com/?to=" & ENCODEURL(A2), A2)` |
| Budi Santoso | ... |

### Dengan JavaScript

```javascript
const guests = [
  "Ahmad Sulaiman",
  "Budi Santoso",
  "Dr. Sarah"
];

const baseUrl = "https://your-website.com";

guests.forEach(guest => {
  const url = `${baseUrl}/?to=${encodeURIComponent(guest)}`;
  console.log(url);
});
```

## 📤 Kirim Undangan

### Via WhatsApp
```
Assalamualaikum Bapak/Ibu Ahmad,

Kami mengundang Anda ke pernikahan kami:
https://your-website.com/?to=Bapak%20Ahmad

Terima kasih 🙏
```

### Via Email
Gunakan link dengan nama tamu di subject atau body email.

### Via SMS
Link pendek bisa menggunakan bit.ly atau short.io yang sudah include parameter nama.

## 🧪 Testing

### Test di browser:
1. Buka: `http://localhost:5173/?to=Testing`
2. Cek Welcome Page → harus muncul "Testing"
3. Scroll ke RSVP → form nama harus terisi "Testing"

### Test dengan nama panjang:
```
http://localhost:5173/?to=Bapak%20Dr.%20Ahmad%20Sulaiman,%20M.Kom
```

### Test tanpa parameter:
```
http://localhost:5173/
```
Harus tetap berfungsi dengan teks default.

## 🎨 Customization

### Mengubah parameter URL

Edit `src/hooks/useUrlParams.js`:

```javascript
// Gunakan parameter 'guest' atau 'invitee'
const guestName = searchParams.get('guest') || searchParams.get('invitee') || '';
```

### Menambahkan parameter lain

```javascript
export const useUrlParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  
  return {
    guestName: searchParams.get('to') || '',
    language: searchParams.get('lang') || 'id',
    table: searchParams.get('table') || '',
  };
};
```

## 🔒 Security Note

- URL parameters visible di browser (tidak untuk data sensitif)
- Nama tamu OK untuk URL params
- Jangan kirim data pribadi lain (no HP, alamat, dll)

## ✅ Checklist untuk Production

- [ ] Test URL dengan berbagai nama (panjang, simbol, unicode)
- [ ] Generate URL untuk semua tamu
- [ ] Test share via WhatsApp/Email
- [ ] Pastikan fallback text muncul jika tanpa parameter
- [ ] Mobile responsive check dengan nama panjang
