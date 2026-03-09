/** @format */

export const SPREADSHEET_URL =
  "https://script.google.com/macros/s/AKfycbw7dJr9QpvcWydUeuq6dCu-a60eRjvh0Yi3UcCcOX1Qm3_DRqjVR4OfyrQlGcgAKXI/exec";

export const STORAGE_KEY = "rsvp-submissions";

/**
 * Fetch submissions from Google Spreadsheet
 * @returns {Promise<Array|null>} Array of submissions or null if error
 */
export const fetchSubmissions = async () => {
  try {
    console.log("📡 Fetching from:", SPREADSHEET_URL);
    const response = await fetch(SPREADSHEET_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log("📄 Raw response:", text.substring(0, 200) + "...");

    const data = JSON.parse(text);

    if (data && data.success && Array.isArray(data.submissions)) {
      console.log("✅ Fetched submissions:", data.submissions.length, "items");
      console.log("📋 First item:", data.submissions[0]);
      return data.submissions;
    } else {
      console.warn("⚠️ Invalid data structure:", data);
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching:", error.message);
    return null;
  }
};

/**
 * Submit RSVP to Google Spreadsheet
 * @param {Object} formData - RSVP form data
 * @returns {Promise<boolean>} Success status
 */
export const submitRSVP = async (formData) => {
  try {
    // Pastikan message kosong jika tidak diisi (bukan "-" atau undefined)
    const dataToSend = {
      ...formData,
      message: formData.message?.trim() || "",
    };

    await fetch(SPREADSHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
    return true;
  } catch (error) {
    console.error("❌ Error submitting RSVP:", error);
    return false;
  }
};

/**
 * Load submissions from localStorage
 * @returns {Array} Submissions array
 */
export const loadSubmissions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading submissions:", error);
    return [];
  }
};

/**
 * Save submissions to localStorage
 * @param {Array} submissions - Submissions to save
 */
export const saveSubmissions = (submissions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error("Error saving submissions:", error);
  }
};

/**
 * Clear submissions from localStorage
 */
export const clearSubmissions = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing submissions:", error);
  }
};
