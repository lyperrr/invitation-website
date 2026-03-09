/** @format */

import { useState, useEffect } from "react";

/**
 * Custom hook untuk mengelola state dan logic Gallery
 * @param {Array} images - Array of image imports
 * @param {number} initialDisplayCount - Jumlah gambar yang ditampilkan awalnya
 */
export const useGallery = (images, initialDisplayCount = 10) => {
  // Gallery display state
  const [showAll, setShowAll] = useState(false);
  
  // Modal/Carousel state
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Pinch zoom state (mobile)
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);

  // Derived state
  const displayedImages = showAll ? images : images.slice(0, initialDisplayCount);
  const hasMoreImages = images.length > initialDisplayCount;
  const isModalOpen = selectedImageIndex !== null;

  // Toggle show all images
  const toggleShowAll = () => setShowAll((prev) => !prev);

  // Open modal with specific image
  const openImage = (index) => setSelectedImageIndex(index);

  // Close modal and reset zoom/position
  const closeModal = () => {
    setSelectedImageIndex(null);
    resetZoom();
  };

  // Reset zoom and position
  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Navigate to previous image
  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetZoom();
  };

  // Navigate to next image
  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetZoom();
  };

  // Wheel zoom handler
  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(1, zoom + delta), 4);

    setZoom(newZoom);

    // Reset position when zoom is 1
    if (newZoom === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // Effect to handle mouse move and mouse up during drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && zoom > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, zoom]);

  // Touch handlers for mobile pinch zoom
  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault();
      const distance = getDistance(e.touches);
      setInitialDistance(distance);
      setInitialZoom(zoom);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Pan
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault();
      const distance = getDistance(e.touches);
      const scale = distance / initialDistance;
      const newZoom = Math.min(Math.max(1, initialZoom * scale), 4);
      setZoom(newZoom);

      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      // Pan
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialDistance(0);
  };

  // Download image handler
  const handleDownload = async (imageUrl, index) => {
    const fileName = `gallery-${index + 1}.jpg`;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return {
    // Display state
    showAll,
    displayedImages,
    hasMoreImages,
    toggleShowAll,
    
    // Modal state
    isModalOpen,
    selectedImageIndex,
    openImage,
    closeModal,
    
    // Navigation
    goToPrevious,
    goToNext,
    
    // Zoom & Pan
    zoom,
    position,
    isDragging,
    handleWheel,
    handleMouseDown,
    
    // Touch handlers
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    
    // Utility
    handleDownload,
    galleryImages: images,
  };
};
