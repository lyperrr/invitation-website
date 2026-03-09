/** @format */

import { motion as Motion } from "motion/react";

/**
 * ImageGrid Component
 * Menampilkan grid gambar dengan pinterest/masonry layout
 */
const ImageGrid = ({ images, onImageClick }) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-2 gap-2 space-y-2">
      {images.map((image, index) => (
        <Motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="overflow-hidden rounded-lg cursor-pointer group"
          onClick={() => onImageClick(index)}
        >
          <img
            src={image}
            alt={`Gallery ${index + 1}`}
            loading="lazy"
            className="w-full object-cover transition duration-300 brightness-75 group-hover:scale-105 group-hover:brightness-100"
          />
        </Motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
