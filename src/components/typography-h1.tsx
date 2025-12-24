import { ReactNode } from "react";

function TypographyH1({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h1 className="scroll-m-20 font-extrabold tracking-tight text-3xl sm:text-4xl">
         {children}
      </h1>
   );
}

export default TypographyH1