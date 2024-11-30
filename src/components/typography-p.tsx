import { ReactNode } from "react";

function TypographyP({ children }: Readonly<{ children: ReactNode }>) {
   return <p className="leading-7 [&:not(:first-child)]:mt-2">{children}</p>;
}

export default TypographyP