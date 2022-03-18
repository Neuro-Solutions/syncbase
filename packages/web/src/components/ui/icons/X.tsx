import ctl from "@netlify/classnames-template-literals";
import type { ComponentPropsWithoutRef, FC } from "react";

interface XProps extends ComponentPropsWithoutRef<"svg"> {
  error?: boolean;
}

const xClasses = (error?: boolean) =>
  ctl(`
  w-5
  h-5
  ${error && "text-red-500"}
`);

export const X: FC<XProps> = ({ error }) => {
  return (
    <svg
      className={xClasses(error)}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      ></path>
    </svg>
  );
};
