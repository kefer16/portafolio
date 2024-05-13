import React from "react";
interface Props {
   text: string;
}

export default function TypografyLead({ text }: Props) {
   return <p className="text-xl text-muted-foreground">{text}</p>;
}
