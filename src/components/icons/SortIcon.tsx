
type filterIconProps = React.SVGProps<SVGSVGElement>;

const SortIcon = (props: filterIconProps) => {
  return (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
  <path d="M13.4415 6.62732H22M13.4415 11.4421H19.5547M13.4415 16.2569H17.1094M5.80564 6V18M9.7566 14.3317L5.80564 18L2 14.3317" stroke="#1E8CAB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
};

export default SortIcon;