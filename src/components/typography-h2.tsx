import React from "react";
interface Props {
   text: string;
}
export default function TypographyH2({ text }: Props) {
   return (
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
         {text}
      </h2>
   );
}
