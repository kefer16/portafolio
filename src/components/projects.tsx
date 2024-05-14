import React from "react";
import TypographyH2 from "./typography-h2";
import TypographyP from "./typography-p";
import { TypographyH3 } from "./typography-h3";

export default function Project() {
   return (
      <div
         id="projects"
         className="flex w-full px-5 justify-center min-h-screen"
      >
         <div className="flex flex-col w-full max-w-[1440px] py-5">
            <div className="flex flex-col gap-2 mt-[80px]">
               <TypographyH2 text="Proyectos" />
            </div>
         </div>
      </div>
   );
}
