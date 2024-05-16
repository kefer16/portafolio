import React from "react";
import TypographyH2 from "./typography-h2";
import TypographyP from "./typography-p";
import { TypographyH3 } from "./typography-h3";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import TypografyLead from "./typografy-lead";

export default function Project() {
   return (
      <div
         id="projects"
         className="flex w-full px-5 justify-center min-h-screen"
      >
         <div className="flex flex-col w-full max-w-[1440px] py-5">
            <div className="flex flex-col gap-2 mt-[80px]">
               <TypographyH2 text="Proyectos" />
               <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                  <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150 !p-0">
                     <CardHeader>
                        <CardTitle>Buscador de Paises</CardTitle>
                     </CardHeader>
                     <CardContent className="flex flex-col justify-center">
                        <Image
                           className="w-full h-[300px] dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                           alt="html icon"
                           width={400}
                           height={300}
                           src="/projects/api-contries.webp"
                        />
                     </CardContent>
                     <CardFooter className="flex flex-col">
                        <TypografyLead text="Sitio web para buscar paises por region donde se econtrara informacion esencial del pais, esta informacion se extrae gracias a la API de restcountries.com" />
                        <div className="w-full flex flex-row justify-between pt-3">
                           <Link
                              href="https://apicountries-frontmentor-pjl8qxn75-kefer16.vercel.app/"
                              target="_blank"
                           >
                              <Button>Live Demo</Button>
                           </Link>
                           <Button variant="outline" disabled>
                              GitHub
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
                  <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150 !p-0">
                     <CardHeader>
                        <CardTitle>Vas APP</CardTitle>
                     </CardHeader>
                     <CardContent className="flex flex-col justify-center">
                        <Image
                           className="w-full h-[300px] dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                           alt="html icon"
                           width={400}
                           height={300}
                           src="/projects/vas-app.webp"
                        />
                     </CardContent>
                     <CardFooter className="flex flex-col">
                        <TypografyLead text="Aplicación móvil para gestión de proyectos, esta se conecta a la API Vas" />
                        <div className="w-full flex flex-row justify-between pt-3">
                           <Button disabled>Live Demo</Button>

                           <Button variant="outline" disabled>
                              GitHub
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
                  <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150 !p-0">
                     <CardHeader>
                        <CardTitle>API Vas</CardTitle>
                     </CardHeader>
                     <CardContent className="flex flex-col justify-center">
                        <Image
                           className="w-full h-[300px] dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                           alt="html icon"
                           width={400}
                           height={300}
                           src="/projects/vas-swagger.webp"
                        />
                     </CardContent>
                     <CardFooter className="flex flex-col">
                        <TypografyLead text="API REST que hara como puente para comunicar la aplicación móvil Vas con la base de datos SQL" />
                        <div className="w-full flex flex-row justify-between pt-3">
                           <Link
                              href="https://vasapi-production.up.railway.app/swagger"
                              target="_blank"
                           >
                              <Button>Live Demo</Button>
                           </Link>
                           <Button variant="outline" disabled>
                              GitHub
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
                  <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150 !p-0">
                     <CardHeader>
                        <CardTitle>Gamertec</CardTitle>
                     </CardHeader>
                     <CardContent className="flex flex-col justify-center">
                        <Image
                           className="w-full h-[300px] dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                           alt="html icon"
                           width={400}
                           height={300}
                           src="/projects/gamertec-frontend-home.webp"
                        />
                     </CardContent>
                     <CardFooter className="flex flex-col">
                        <TypografyLead text="Carrito de compras de productos tecnológicos, se trabajó apartado de administrador y pagos con 'Mercado Pago'" />
                        <div className="w-full flex flex-row justify-between pt-3">
                           <Button disabled>Live Demo</Button>

                           <Button variant="outline" disabled>
                              GitHub
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}
