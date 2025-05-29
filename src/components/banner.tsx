import TypographyH1 from "@/components/typography-h1";
import TypographyP from "@/components/typography-p";
import TypographyLead from "@/components/typografy-lead";
import { ArrowDownToLine, Mail } from "lucide-react";
import Link from "next/link";
import TypographySpan from "@/components/typography-span";
import { PresentationData } from "@/data/presentacion.data";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

function Banner() {
   const { welcome, prefix, short_name, last_name, degree, presentation, email, src_image } = PresentationData;
   return (
      <div className="flex w-full justify-center h-full">
         <div className="flex w-full max-w-[1440px] ">
            <div className="w-full px-5 flex flex-col gap-4 relative place-items-center md:flex-row md:justify-around">
               <div className="w-full flex flex-col gap-2 md:w-2/4 md:gap-4">
                  <div className="flex flex-col gap-1">
                     <TypographySpan className="text-2xl font-semibold animate-bounce">{welcome}</TypographySpan>
                     <div className="flex gap-2 items-end">
                        <TypographySpan className="text-4xl lg:text-5xl">{prefix}</TypographySpan>
                        <TypographyH1>{short_name}</TypographyH1>
                     </div>
                     <TypographyLead>{degree}</TypographyLead>
                  </div>
                  <TypographyP>{presentation}</TypographyP>
                  <div className="grid grid-cols-2 gap-4 md:flex md:flex-row">
                     <Button color="primary" size="md" variant="shadow">
                        Descargar CV
                        <ArrowDownToLine className="ml-3" color="#fff" size={16} />
                     </Button>
                     <Button as={Link} color="secondary" href={`mailto:${email}`} size="md" >
                        Contacto
                        <Mail className="ml-3" color="#fff" size={16} />
                     </Button>
                  </div>
               </div>
               <div className="flex justify-center items-center w-[250px] md:h-[250px]">
                  <Image
                     isBlurred
                     width={500}
                     src={src_image}
                     alt={`foto de ${last_name}`}
                     loading="lazy"
                     radius="full"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Banner