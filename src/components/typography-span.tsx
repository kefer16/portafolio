import React from "react";
interface Props {
   text: string;
   className?: string
}
export default function TypographySpan({ text, className }: Props) {
   return (
      <span className={`scroll-m-20 font-extrabold tracking-tight first:mt-0 ${className}`}>
         {text}
      </span>
   );
}
