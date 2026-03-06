/** @format */
import {
  motion as Motion,
  useInView,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { useRef } from "react";

// Template animasi dasar untuk fade in
export const FadeIn = ({ children, delay = 0, duration = 0.5 }) => (
  <Motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi slide in dari bawah
export const SlideInUp = ({ children, delay = 0, duration = 0.5 }) => (
  <Motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi slide in dari atas
export const SlideInDown = ({ children, delay = 0, duration = 0.5 }) => (
  <Motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi slide in dari kiri
export const SlideInLeft = ({ children, delay = 0, duration = 0.5 }) => (
  <Motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi slide in dari kanan
export const SlideInRight = ({ children, delay = 0, duration = 0.5 }) => (
  <Motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi slide dengan direction custom
export const SlideIn = ({
  children,
  direction = "up",
  distance = 50,
  delay = 0,
  duration = 0.5,
}) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <Motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </Motion.div>
  );
};

// Template animasi scale in
export const ScaleIn = ({ children, delay = 0, duration = 0.5 }) => (
  <Motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi bounce in
export const BounceIn = ({ children, delay = 0, duration = 0.8 }) => (
  <Motion.div
    initial={{ opacity: 0, scale: 0.3 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration,
      delay,
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </Motion.div>
);

// Template animasi stagger untuk list
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => (
  <Motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
  >
    {children}
  </Motion.div>
);

export const StaggerItem = ({ children }) => (
  <Motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </Motion.div>
);

// ============================================
// PAGE TRANSITIONS
// ============================================

// Template animasi untuk halaman penuh (seperti WelcomePage geser ke atas)
export const PageSlideUp = ({ children, isVisible, duration = 1 }) => (
  <Motion.div
    initial={{ y: 0 }}
    animate={{ y: isVisible ? 0 : "-100%" }}
    transition={{ duration, ease: "easeInOut" }}
    className="fixed inset-0 z-50"
  >
    {children}
  </Motion.div>
);

// Template animasi split screen (kiri dari kiri, kanan dari kanan)
export const SplitScreenReveal = ({
  leftChildren,
  rightChildren,
  isVisible,
  duration = 1,
}) => (
  <div className="flex h-screen">
    <Motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration, ease: "easeOut" }}
      className="w-1/2"
    >
      {leftChildren}
    </Motion.div>
    <Motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration, ease: "easeOut" }}
      className="w-1/2"
    >
      {rightChildren}
    </Motion.div>
  </div>
);

// Template animasi rotate in
export const RotateIn = ({ children, delay = 0, duration = 0.5 }) => (
  <Motion.div
    initial={{ opacity: 0, rotate: -180 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi flip in
export const FlipIn = ({ children, delay = 0, duration = 0.6 }) => (
  <Motion.div
    initial={{ opacity: 0, rotateY: -90 }}
    animate={{ opacity: 1, rotateY: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </Motion.div>
);

// Template animasi pulse (untuk efek attention)
export const Pulse = ({ children, repeat = Infinity }) => (
  <Motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat, ease: "easeInOut" }}
  >
    {children}
  </Motion.div>
);

// ============================================
// INTERACTIVE ANIMATIONS
// ============================================

// Template animasi untuk hover effect
export const HoverLift = ({ children }) => (
  <Motion.div
    whileHover={{ y: -10 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {children}
  </Motion.div>
);

// Template animasi untuk button click
export const TapScale = ({ children }) => (
  <Motion.div
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </Motion.div>
);

// ============================================
// UI COMPONENT ANIMATIONS
// ============================================

// Template animasi untuk loading spinner
export const LoadingSpinner = ({ size = 40 }) => (
  <Motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    style={{
      width: size,
      height: size,
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #3498db",
      borderRadius: "50%",
    }}
  />
);

// Template animasi untuk progress bar
export const ProgressBar = ({ progress, width = "100%" }) => (
  <Motion.div className="bg-gray-200 rounded-full h-2" style={{ width }}>
    <Motion.div
      className="bg-blue-500 h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </Motion.div>
);

// Template animasi untuk modal
export const ModalAnimation = ({ children, isOpen }) => (
  <Motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isOpen ? 1 : 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <Motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: isOpen ? 1 : 0.8, opacity: isOpen ? 1 : 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      {children}
    </Motion.div>
  </Motion.div>
);

// Template animasi untuk accordion
export const AccordionItem = ({ children, isOpen }) => (
  <Motion.div
    initial={false}
    animate={{ height: isOpen ? "auto" : 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden"
  >
    {children}
  </Motion.div>
);

// Template animasi untuk tooltip
export const TooltipAnimation = ({ children, isVisible }) => (
  <Motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.8,
    }}
    transition={{ duration: 0.2 }}
    className="absolute z-10 px-2 py-1 bg-black text-white text-sm rounded"
  >
    {children}
  </Motion.div>
);

// Template animasi untuk card hover
export const CardHover = ({ children }) => (
  <Motion.div
    whileHover={{
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    }}
    transition={{ type: "spring", stiffness: 300 }}
    className="cursor-pointer"
  >
    {children}
  </Motion.div>
);

// ============================================
// ADVANCED ANIMATIONS
// ============================================

// Template animasi untuk text typing effect
export const TypingText = ({ text, delay = 0 }) => {
  const letters = text.split("");

  return (
    <div>
      {letters.map((letter, index) => (
        <Motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.1 }}
        >
          {letter}
        </Motion.span>
      ))}
    </div>
  );
};

// Template animasi untuk image reveal
export const ImageReveal = ({ src, alt, delay = 0 }) => (
  <Motion.div
    initial={{ clipPath: "inset(0 100% 0 0)" }}
    animate={{ clipPath: "inset(0 0% 0 0)" }}
    transition={{ duration: 1, delay }}
    className="overflow-hidden"
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </Motion.div>
);

// Template animasi untuk parallax effect (sederhana)
export const ParallaxElement = ({ children }) => {
  const y = useMotionValue(0);

  return (
    <Motion.div style={{ y }} className="relative">
      {children}
    </Motion.div>
  );
};

// Catatan: Untuk parallax yang lebih kompleks dengan scroll, gunakan useScroll dan useTransform

// Template animasi untuk scroll-triggered animation
export const ScrollReveal = ({ children, threshold = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </Motion.div>
  );
};

// Template animasi untuk scroll-triggered rotation
export const ScrollRevealRotate = ({ children, threshold = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -180 }}
      animate={
        isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -180 }
      }
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {children}
    </Motion.div>
  );
};
