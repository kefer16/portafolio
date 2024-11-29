import { ReactNode } from "react";
interface Props {
   className?: string
   children: ReactNode;
}
export default function TypographySpan({ children, className }: Props) {
   return (
      <span className={`scroll-m-20 font-extrabold tracking-tight first:mt-0 ${className}`}>
         {children}
      </span>
   );
}
