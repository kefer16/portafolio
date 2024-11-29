import TypographyH1 from "@/components/typography-h1";
import TypographyP from "@/components/typography-p";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TypographyLead from "@/components/typografy-lead";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowDownToLine, Mail } from "lucide-react";
import Link from "next/link";
import TypographySpan from "@/components/typography-span";
import { PresentationData } from "@/data/presentacion.data";

export default function Banner() {
   const presentation = PresentationData;
   return (
      <div className="flex w-full justify-center h-full">
         <div className="flex w-full max-w-[1440px] ">
            <div className="absolute md:justify-around md:flex-row z-[-1] place-items-center before:absolute
            before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial 
            before:from-transparent before:to-blue-700 before:blur-2xl before:content-[''] after:absolute after:-z-20 
            after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-900 after:via-[#0141ff]
            after:blur-2xl after:content-[''] before:bg-gradient-to-br before:opacity-10 after:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]" />
            <div className="w-full px-5 flex flex-col gap-4 relative place-items-center md:flex-row md:justify-around">
               <div className="w-full flex flex-col gap-2 md:w-2/4 md:gap-4">
                  <div className="flex flex-col gap-1">
                     <TypographySpan className="text-2xl font-semibold animate-bounce">{presentation.welcome}</TypographySpan>
                     <div className="flex gap-2 items-end">
                        <TypographySpan className="text-4xl lg:text-5xl">{presentation.prefix}</TypographySpan>
                        <TypographyH1>{presentation.short_name}</TypographyH1>
                     </div>
                     <TypographyLead>{presentation.degree}</TypographyLead>
                  </div>
                  <TypographyP>{presentation.presentation}</TypographyP>
                  <div className="grid grid-cols-2 gap-4 md:flex md:flex-row">
                     <Button variant="default" className="w-full transition duration-150 ease-in-out hover:scale-110 md:w-min">
                        Descargar CV
                        <ArrowDownToLine className="ml-3" color="#fff" size={16} />
                     </Button>
                     <Link href={`mailto:${presentation.email}`}>
                        <Button variant="secondary" className="w-full transition duration-150 ease-in-out hover:scale-110 md:w-min">
                           Contacto
                           <Mail className="ml-3" color="#fff" size={16} />
                        </Button>
                     </Link>
                  </div>
               </div>

               <div className="flex justify-center items-center w-[250px] md:h-[250px]">
                  <AspectRatio ratio={1 / 1}>
                     <Image
                        fill
                        className="relative drop-shadow-[0_0_2rem_#0141ff3f] rounded-full"
                        src={presentation.src_image}
                        alt={`foto de ${presentation.last_name}`}
                        priority
                     />
                  </AspectRatio>
               </div>
            </div>
         </div>
      </div>
   );
}
