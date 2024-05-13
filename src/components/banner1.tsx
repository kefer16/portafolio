import React from "react";
import TypographyH1 from "./typography-h1";
import TypographyP from "./typography-p";
import Image from "next/image";
import TypographyH2 from "./typography-h2";
import { Button } from "./ui/button";
import TypografyLead from "./typografy-lead";

export default function Banner() {
   return (
      <div className="flex w-full justify-center h-full">
         <div className="flex w-full max-w-[1440px] ">
            <div
               className="w-full flex justify-around relative z-[-1] place-items-center before:absolute 
            before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial 
            before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 
            after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 
            after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
            before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] 
            after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
            >
               <div className="flex flex-col w-2/4 gap-4">
                  <div className="flex flex-col gap-1">
                     <TypographyH2 text="Hola, 👋" />
                     <TypographyH1 text="Soy Kevin Morales" />
                     <TypografyLead text="Técnico en Computación e Informática" />
                  </div>

                  <TypographyP
                     text="Profesional con experiencia en desarrollo de software de
                     aplicaciones de escritorio y web, responsable, dinámico,
                     creativo, facilidad de adaptación, empatía con equipo de
                     trabajo, facilidad de resolución de problemas y sobre todo
                     con muchas ganas de aprender."
                  />
                  <div className="flex flex-row gap-5">
                     <Button variant="default">Descargar CV</Button>
                     <Button variant="secondary">Contacto</Button>
                  </div>
               </div>

               <div className="flex justify-center items-center">
                  <Image
                     className="relative dark:drop-shadow-[0_0_2rem_#0141ff3f] rounded-full"
                     src="/foto.jpg"
                     alt="Next.js Logo"
                     width={300}
                     height={300}
                     priority
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
