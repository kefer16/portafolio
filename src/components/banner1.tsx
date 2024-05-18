import React from "react";
import TypographyH1 from "./typography-h1";
import TypographyP from "./typography-p";
import Image from "next/image";
import TypographyH2 from "./typography-h2";
import { Button } from "./ui/button";
import TypografyLead from "./typografy-lead";
import { AspectRatio } from "./ui/aspect-ratio";
import {
   ArrowDownToLine,
   CircleArrowDown,
   CircleArrowDownIcon,
   Mail,
} from "lucide-react";
import Link from "next/link";

export default function Banner() {
   return (
      <div className="flex w-full justify-center h-full">
         <div className="flex w-full max-w-[1440px] ">
            <div
               className="absolute md:justify-around md:flex-row z-[-1] place-items-center before:absolute 
            before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial 
            before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 
            after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 
            after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
            before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] 
            after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
            ></div>
            <div className="w-full px-5 flex flex-col  md:justify-around md:flex-row  relative place-items-center">
               <div className="flex flex-col w-full md:w-2/4 gap-4">
                  <div className="flex flex-col gap-1">
                     <TypographyH2 text="Hola, 👋" />
                     <TypographyH1 text="Soy Kevin Morales" />
                     <TypografyLead text="Técnico en Computación e Informática" />
                  </div>
                  <TypographyP text="Un desarrollador apasionado con más de dos años de experiencia en la creación y mantenimiento de aplicaciones web y de escritorio. Mi enfoque se centra en ofrecer soluciones eficientes y escalables tanto en el frontend como en el backend." />
                  <div className="flex flex-row gap-5">
                     <Button
                        className="transition duration-150 ease-in-out hover:scale-110"
                        variant="default"
                     >
                        Descargar CV
                        <ArrowDownToLine
                           className="ml-3"
                           color="#fff"
                           size={16}
                        />
                     </Button>
                     <Link href="#contact">
                        <Button
                           className="transition duration-150 ease-in-out hover:scale-110"
                           variant="secondary"
                        >
                           Contacto
                           <Mail className="ml-3" color="#fff" size={16} />
                        </Button>
                     </Link>
                  </div>
               </div>

               <div className="flex mt-10 justify-center items-center w-[250px] h-[250px]">
                  <AspectRatio ratio={1 / 1}>
                     <Image
                        className="relative dark:drop-shadow-[0_0_2rem_#0141ff3f] rounded-full"
                        src="/foto.webp"
                        alt="Next.js Logo"
                        fill
                        priority
                     />
                  </AspectRatio>
               </div>
            </div>
         </div>
      </div>
   );
}
