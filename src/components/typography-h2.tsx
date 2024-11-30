import { ReactNode } from "react";

function TypographyH2({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
         {children}
      </h2>
   );
}

export default TypographyH2