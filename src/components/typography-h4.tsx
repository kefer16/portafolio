import { ReactNode } from "react";

function TypographyH4({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h4 className="text-xl font-semibold text-muted-foreground">
         {children}
      </h4>
   );
}

export default TypographyH4