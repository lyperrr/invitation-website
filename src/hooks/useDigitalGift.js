/** @format */

import { useState } from "react";

/**
 * Custom hook untuk mengelola state dan logic Digital Gift
 * @param {Array} bankAccounts - Array of bank account data
 */
export const useDigitalGift = (bankAccounts) => {
  const [copiedId, setCopiedId] = useState(null);

  // Handle copy account number to clipboard
  const handleCopy = async (accountNumber, id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Modern clipboard API
        await navigator.clipboard.writeText(accountNumber);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = accountNumber;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      // Set copied state
      setCopiedId(id);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return {
    copiedId,
    handleCopy,
  };
};
