import React from "react";
interface Props {
   text: string;
}
export default function TypographyP({ text }: Props) {
   return <p className="leading-7 [&:not(:first-child)]:mt-2">{text}</p>;
}
