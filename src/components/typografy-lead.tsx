import { ReactNode } from "react";


export default function TypographyLead({ children }: Readonly<{ children: ReactNode }>) {
   return <h2 className="text-xl text-muted-foreground">{children}</h2>;
}
