/** @format */

import { useMemo } from "react";

/**
 * Custom hook untuk mengambil parameter dari URL
 * Contoh: ?to=John%20Doe atau ?name=John%20Doe
 * @returns {Object} Object dengan parameter URL
 */
export const useUrlParams = () => {
  const params = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Ambil parameter 'to' atau 'name' dari URL
    const guestName = searchParams.get("to") || searchParams.get("name") || "";

    // Decode dan bersihkan nama
    const decodedName = guestName ? decodeURIComponent(guestName) : "";

    return {
      guestName: decodedName,
      hasGuestName: decodedName.length > 0,
      // Tambahan params lain bisa ditambahkan di sini
      allParams: Object.fromEntries(searchParams.entries()),
    };
  }, []);

  return params;
};
