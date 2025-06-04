import { ReactNode } from "react";

function TypographyP({ children }: Readonly<{ children: ReactNode }>) {
   return <p>{children}</p>;
}

export default TypographyP