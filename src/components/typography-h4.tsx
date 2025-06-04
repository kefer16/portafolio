import { ReactNode } from "react";

function TypographyH4({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h3 className="text-xl font-semibold text-muted-foreground">
         {children}
      </h3>
   );
}

export default TypographyH4