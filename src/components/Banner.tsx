import React from "react";
import TypographyH1 from "./typography-h1";
import TypographyP from "./typography-p";

export default function Banner() {
   return (
      <div className="flex w-full justify-center">
         <div className="flex justify-center w-full max-w-[1440px] py-10">
            <div className="flex flex-col items-center">
               <TypographyH1 text="Hola, soy Kevin Morales" />
               <TypographyP text="Programador full stack" />
            </div>
         </div>
      </div>
   );
}
