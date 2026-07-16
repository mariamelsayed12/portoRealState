
type filterIconProps = React.SVGProps<SVGSVGElement>;

const FilterIcon = (props: filterIconProps) => {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none" {...props}>
  <path d="M3.46154 6H14.5385M1 1H17M7.15385 11H10.8462" stroke="#1E8CAB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
};

export default FilterIcon;