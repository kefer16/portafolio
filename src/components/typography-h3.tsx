import { ReactNode } from "react";

function TypographyH3({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h3 className="text-2xl font-semibold">
         {children}
      </h3>
   );
}

export default TypographyH3