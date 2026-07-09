interface ShapeProps {
  className?: string;
  width?: number;
  height?: number;
}

const IconeofAnimatSection = ({
  className,
  width = 137,
  height = 113,
}: ShapeProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 137 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.1038 -0.441592L153.859 -0.643065L153.691 113.853L46.8196 114.717C43.8418 111.807 40.7835 108.895 37.7253 105.983C20.4918 89.5743 3.25839 73.1657 0.431991 57.095C-2.11176 42.6314 7.01421 28.4415 16.1402 14.2516C19.2876 9.35758 22.4351 4.46361 25.1038 -0.441592Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconeofAnimatSection;