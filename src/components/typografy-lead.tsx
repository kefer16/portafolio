import { ReactNode } from "react";

function TypographyLead({ children }: Readonly<{ children: ReactNode }>) {
   return <p className="text-muted-foreground">{children}</p>;
}

export default TypographyLead