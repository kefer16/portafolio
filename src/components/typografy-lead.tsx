import { ReactNode } from "react";

function TypographyLead({ children }: Readonly<{ children: ReactNode }>) {
   return <h2 className="text-muted-foreground">{children}</h2>;
}

export default TypographyLead