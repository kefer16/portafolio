import { ReactNode } from "react";

function TypographyP({ children }: Readonly<{ children: ReactNode }>) {
   return <p className="text-base">{children}</p>;
}

export default TypographyP