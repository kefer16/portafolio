import { ReactNode } from "react";

function TypographyH1({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
         {children}
      </h1>
   );
}

export default TypographyH1