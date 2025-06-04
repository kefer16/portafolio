import { ReactNode } from "react";

function TypographyH3({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h3 className="text-2xl font-semibold text-slate-300">
         {children}
      </h3>
   );
}

export default TypographyH3