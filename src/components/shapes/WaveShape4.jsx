/** @format */

const WaveShape4 = ({
  className = "",
  rotate = false,
  fillColors = "fill-primary",
}) => {
  return (
    <svg
      className={`${rotate ? "rotate-180" : ""} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 100"
    >
      <path
        d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z"
        className={fillColors}
      ></path>
    </svg>
  );
};

export default WaveShape4;
