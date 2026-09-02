"use client";

import TypographyH1 from "@/components/typography-h1";
import TypographyP from "@/components/typography-p";
import TypographyLead from "@/components/typografy-lead";
import { ArrowDownToLine, Mail } from "lucide-react";
import Link from "next/link";
import TypographySpan from "@/components/typography-span";
import { PresentationData } from "@/data/presentacion.data";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";

const fadeUp = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
};

function Banner() {
   const { welcome, prefix, short_name, last_name, degree, presentation, email, src_image } = PresentationData;
   const isChristmasSeason = new Date().getMonth() === 11;
   return (
      <div className="flex w-full justify-center h-full">
         <div className="flex w-full max-w-[1440px] ">
            <div className="w-full px-5 flex flex-col gap-10 relative place-items-center md:flex-row md:justify-around">
               <div className="w-full flex flex-col gap-4 md:w-2/4 md:gap-4">
                  <div className="flex flex-col gap-1">
                     <motion.div initial="initial" animate="animate" variants={fadeUp} transition={{ duration: 0.5 }}>
                        <TypographySpan className="text-2xl font-semibold animate-bounce">{welcome}</TypographySpan>
                     </motion.div>
                     <motion.div
                        className="flex gap-2 items-end"
                        initial="initial"
                        animate="animate"
                        variants={fadeUp}
                        transition={{ duration: 0.5, delay: 0.1 }}
                     >
                        {/* <TypographySpan className="text-4xl lg:text-5xl">{prefix}</TypographySpan> */}
                        <TypographyH1>{short_name}</TypographyH1>
                        {isChristmasSeason && (
                           <Image
                              isBlurred
                              className="dark:hidden h-[40px] md:h-[50px]"
                              alt={`chistmas tree icon`}
                              src="/svg/christmas-tree.svg"
                              loading="lazy"
                           />
                        )}
                     </motion.div>
                     <motion.div initial="initial" animate="animate" variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
                        <TypographyLead>{degree}</TypographyLead>
                     </motion.div>
                  </div>
                  <motion.div initial="initial" animate="animate" variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
                     <TypographyP>{presentation}</TypographyP>
                  </motion.div>
                  <motion.div
                     className="grid grid-cols-2 gap-4 md:flex md:flex-row"
                     initial="initial"
                     animate="animate"
                     variants={fadeUp}
                     transition={{ duration: 0.5, delay: 0.4 }}
                  >
                     <Link href="/cv/cv-2026-web.pdf" target="_blank">
                        <Button color="primary" size="md" variant="shadow">
                           Descargar CV
                           <ArrowDownToLine className="ml-3" color="#fff" size={16} />
                        </Button>
                     </Link>
                     <Button as={Link} color="secondary" href={`mailto:${email}`} size="md" >
                        Contacto
                        <Mail className="ml-3" size={16} />
                     </Button>
                  </motion.div>
               </div>
               <motion.div
                  className="relative flex justify-center items-center w-[250px] md:h-[250px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
               >
                  <Image
                     // isBlurred
                     width={500}
                     src={src_image}
                     alt={`foto de ${last_name}`}
                     loading="lazy"
                     radius="full"
                  />
               </motion.div>
            </div>
         </div>
      </div>
   );
}

export default Banner