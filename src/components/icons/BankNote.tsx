
type IconProps = React.SVGProps<SVGSVGElement>;

const BankNoteIcon = (props: IconProps) => {
  return (
    <svg
      width="28"
      height="19"
      viewBox="0 0 28 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.06641 3.46665C1.06641 2.14117 2.14092 1.06665 3.46641 1.06665H24.2664C25.5919 1.06665 26.6664 2.14117 26.6664 3.46665V14.6667C26.6664 15.9921 25.5919 17.0667 24.2664 17.0667H3.46641C2.14092 17.0667 1.06641 15.9921 1.06641 14.6667V3.46665Z"
        stroke="currentColor"
        strokeWidth={2.13333}
      />
      <path
        d="M17.0664 9.06665C17.0664 10.834 15.6337 12.2667 13.8664 12.2667C12.0991 12.2667 10.6664 10.834 10.6664 9.06665C10.6664 7.29934 12.0991 5.86665 13.8664 5.86665C15.6337 5.86665 17.0664 7.29934 17.0664 9.06665Z"
        stroke="currentColor"
        strokeWidth={2.13333}
      />
    </svg>
  );
};

export default BankNoteIcon;