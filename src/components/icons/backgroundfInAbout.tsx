
interface BackgroundShapeProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const backgroundShapeInAbout = ({
  className = "",
  width = 486,
  height = 211,
  color = "#EDEFF2",
}: BackgroundShapeProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 486 211"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M325 26.5C325 41.1355 336.864 53 351.5 53H442C466.301 53 486 72.6995 486 97V114C486 138.301 466.301 158 442 158H351.5C336.864 158 325 169.864 325 184.5C325 199.136 313.136 211 298.5 211H187.5C172.864 211 161 199.136 161 184.5C161 169.864 149.136 158 134.5 158H44C19.6995 158 0 138.301 0 114V97C0 72.6995 19.6995 53 44 53H134.5C149.136 53 161 41.1355 161 26.5C161 11.8645 172.864 0 187.5 0H298.5C313.136 0 325 11.8645 325 26.5Z"
        fill={color}
      />
    </svg>
  );
};

export default backgroundShapeInAbout;