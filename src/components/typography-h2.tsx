import { ReactNode } from "react";

function TypographyH2({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h2 className="text-3xl font-bold">
         {children}
      </h2>
   );
}

export default TypographyH2