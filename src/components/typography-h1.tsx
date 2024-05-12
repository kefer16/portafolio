import React from "react";

interface Props {
   text: string;
}
export default function TypographyH1({ text }: Props) {
   return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
         {text}
      </h1>
   );
}
