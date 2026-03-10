/** @format */

const WaveShape6 = ({
  className = "",
  rotate = false,
  fillColors = "fill-primary",
}) => {
  return (
    <svg
      className={`${rotate ? "rotate-180" : ""} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 436 132"
    >
      <path className={fillColors} d="M436 0H0V132C132 0 304 0 436 132V0Z" />
    </svg>
  );
};

export default WaveShape6;
