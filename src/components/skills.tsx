import React from "react";
import TypographyH2 from "./typography-h2";
import TypographyP from "./typography-p";
import { TypographyH3 } from "./typography-h3";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select";
import Image from "next/image";

export default function Skills() {
   return (
      <div id="skills" className="flex w-full px-5 justify-center min-h-screen">
         <div className="flex flex-col mt-[80px] w-full max-w-[1440px] py-5">
            <TypographyH2 text="Habilidades" />
            <div className="w-full md:w-[600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>HTML</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="html icon"
                        width={100}
                        height={100}
                        src="/svg/html.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>

               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>CSS</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="css icon"
                        width={100}
                        height={100}
                        src="/svg/css.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>JS</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="js icon"
                        width={100}
                        height={100}
                        src="/svg/js.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>

               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>React</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="react icon"
                        width={100}
                        height={100}
                        src="/svg/react.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>Postman</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="Postman icon"
                        width={100}
                        height={100}
                        src="/svg/postman.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>Swagger</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="swagger icon"
                        width={100}
                        height={100}
                        src="/svg/swagger.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>Nest</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="Nest icon"
                        width={100}
                        height={100}
                        src="/svg/nest.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>Git</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="git icon"
                        width={100}
                        height={100}
                        src="/svg/git.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>GitHub</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="github icon"
                        width={100}
                        height={100}
                        src="/svg/github.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>

               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>C#</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="c# icon"
                        width={100}
                        height={100}
                        src="/svg/cisharp.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>SQL</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="sql icon"
                        width={100}
                        height={100}
                        src="/svg/sql.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>

               <Card className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                  <CardHeader className="text-center">
                     <CardTitle>PHP</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                     <Image
                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                        alt="php icon"
                        width={100}
                        height={100}
                        src="/svg/php.svg"
                        loading="lazy"
                     />
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
