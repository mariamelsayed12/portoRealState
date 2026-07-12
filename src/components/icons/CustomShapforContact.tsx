type CustomShapeProps = {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
};

export default function CustomShapeForContact({
  width = 588,
  height = 261,
  fill = "#E9F4F7",
  className,
}: CustomShapeProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 588 261"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M229 28C229 43.464 241.536 56 257 56H331C346.464 56 359 43.464 359 28C359 12.536 371.536 0 387 0H430C445.464 0 458 12.536 458 28C458 43.464 470.536 56 486 56H544C568.301 56 588 75.6995 588 100V217C588 241.301 568.301 261 544 261H387C371.536 261 359 248.464 359 233C359 217.536 346.464 205 331 205H257C241.536 205 229 217.536 229 233C229 248.464 216.464 261 201 261H100C75.6995 261 56 241.301 56 217V159C56 143.536 43.464 131 28 131C12.536 131 0 118.464 0 103V44C0 19.6995 19.6995 0 44 0H201C216.464 0 229 12.536 229 28Z"
        fill={fill}
      />
    </svg>
  );
}