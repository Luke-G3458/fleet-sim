const GridLayer = () => {
  return (
    <svg
      className="absolute inset-0 -z-10"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="grid"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 25 0 L 0 0 0 25"
            fill="none"
            stroke="#443d35"
            strokeWidth="3"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#grid)"
        stroke="#443d35"
        strokeWidth="3"
      />
    </svg>
  );
};

export default GridLayer;
