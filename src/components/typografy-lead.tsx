import React from "react";
interface Props {
   text: string;
}

export default function TypographyLead({ text }: Props) {
   return <h2 className="text-xl text-muted-foreground">{text}</h2>;
}
