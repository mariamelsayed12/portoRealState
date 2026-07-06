import React from "react";

type CircleIconProps = React.SVGProps<SVGSVGElement>;

const CartIcon = (props: CircleIconProps) => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.62489 6.52395C5.22559 6.52395 6.52322 5.22632 6.52322 3.62562C6.52322 2.02492 5.22559 0.727295 3.62489 0.727295C2.02419 0.727295 0.726562 2.02492 0.726562 3.62562C0.726562 5.22632 2.02419 6.52395 3.62489 6.52395Z"
        stroke="currentColor"
        strokeWidth="1.45455"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CartIcon;