/** @format */

const WaveShape2 = ({ className = "", rotate = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 100"
      className={`${rotate ? "rotate-180" : ""} ${className}`}
    >
      <g className="fill-primary">
        <path d="M1000 100C500 100 500 64 0 64V0h1000v100Z" opacity=".5"></path>
        <path d="M1000 100C500 100 500 34 0 34V0h1000v100Z" opacity=".5"></path>
        <path d="M1000 100C500 100 500 4 0 4V0h1000v100Z"></path>
      </g>
    </svg>
  );
};

export default WaveShape2;
