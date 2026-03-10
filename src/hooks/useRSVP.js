/** @format */

import { useState, useEffect, useCallback } from "react";
import {
  fetchSubmissions,
  submitRSVP,
  loadSubmissions,
  saveSubmissions,
  clearSubmissions,
} from "@/lib/rsvpApi";
import { useUrlParams } from "./useUrlParams";

const ITEMS_PER_PAGE = 5;

export const useRSVP = () => {
  const { guestName } = useUrlParams();

  // Initialize form dengan nama dari URL jika ada
  const INITIAL_FORM = {
    name: guestName || "",
    attendance: "",
    guests: "",
    message: "",
  };

  const [form, setForm] = useState(INITIAL_FORM);
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);

  // Helper to update form field
  const updateField = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Handle attendance change
  const handleAttendanceChange = (value) => {
    setForm((prev) => ({
      ...prev,
      attendance: value,
      guests: value === "tidak_hadir" ? "" : prev.guests,
    }));
  };

  // Refresh data from spreadsheet
  const refreshData = useCallback(async () => {
    console.log("🔄 Starting refresh...");
    setIsLoading(true);

    try {
      const spreadsheetData = await fetchSubmissions();

      if (spreadsheetData !== null) {
        console.log("✅ Fetch successful! Data count:", spreadsheetData.length);
        setSubmissions(spreadsheetData);

        if (spreadsheetData.length > 0) {
          saveSubmissions(spreadsheetData);
          console.log("💾 Saved to localStorage");
        } else {
          console.log("📭 Spreadsheet is empty");
          clearSubmissions();
        }
      } else {
        console.warn("⚠️ Fetch failed! Using localStorage as fallback");
        const localData = loadSubmissions();
        console.log("📦 Loaded from localStorage:", localData.length);
        setSubmissions(localData);
      }
    } catch (error) {
      console.error("❌ Error in refreshData:", error);
      const localData = loadSubmissions();
      console.log("📦 Emergency fallback to localStorage:", localData.length);
      setSubmissions(localData);
    } finally {
      setIsLoading(false);
      setLastUpdate(new Date());
    }
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.attendance) return;

    setIsSubmitting(true);
    try {
      const success = await submitRSVP(form);

      if (success) {
        // Add to local state immediately for better UX
        setSubmissions((prev) => [
          {
            id: Date.now(),
            ...form,
            timestamp: new Date().toLocaleString("id-ID"),
          },
          ...prev,
        ]);

        // Reset form tapi pertahankan nama dari URL
        setForm({
          name: guestName || "",
          attendance: "",
          guests: "",
          message: "",
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);

        // Refresh from spreadsheet after 2 seconds
        setTimeout(() => refreshData(), 2000);
      } else {
        alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("🔄 Auto-refresh triggered");
      refreshData();
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [refreshData]);

  // Auto-sync to localStorage when submissions change
  useEffect(() => {
    if (submissions.length > 0) {
      saveSubmissions(submissions);
    }
  }, [submissions]);

  // Pagination calculations
  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSubmissions = submissions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setIsPaginating(true);
    setTimeout(() => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
      setIsPaginating(false);
    }, 300);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setIsPaginating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsPaginating(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setIsPaginating(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsPaginating(false);
      }, 300);
    }
  };

  return {
    // State
    form,
    submissions,
    isSubmitting,
    showSuccess,
    isLoading,
    isPaginating,
    lastUpdate,

    // Pagination
    paginatedSubmissions,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,

    // Actions
    updateField,
    handleAttendanceChange,
    handleSubmit,
    refreshData,

    // Computed
    isFormValid: form.name.trim() && form.attendance,
  };
};
