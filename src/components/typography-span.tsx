import { HTMLAttributes, ReactNode } from "react";

function TypographySpan({ children, className }: ITypographySpan) {
   return (
      <span className={`scroll-m-20 font-extrabold tracking-tight first:mt-0 ${className}`}>
         {children}
      </span>
   );
}

interface ITypographySpan {
   className?: HTMLAttributes<HTMLSpanElement>["className"];
   children: ReactNode;
}

export default TypographySpan