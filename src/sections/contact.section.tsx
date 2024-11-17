import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { SendHorizonal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TypographyH2 from "@/components/typography-h2";

export default function Contact() {
   return (
      <section
         id="contact"
         className="flex w-full px-5 justify-center min-h-screen"
      >
         <div className="flex flex-col w-full max-w-[1440px] py-5">
            <div className="flex flex-col gap-2 mt-[80px]">
               <TypographyH2 text="Contacto" />
               <Card className="w-full mt-5">
                  <CardHeader>
                     {/* <CardTitle>Create project</CardTitle> */}
                     <CardDescription>
                        Completa el siguiente formulario y me pondré en contacto
                        contigo lo antes posible.
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form>
                        <div className="grid w-full items-center gap-4">
                           <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="name">Nombre Completo</Label>
                              <Input
                                 id="name"
                                 placeholder="Ingrese su nombre completo"
                              />
                           </div>
                           <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="email">Correo</Label>
                              <Input
                                 id="email"
                                 placeholder="Ingresa el correo"
                              />
                           </div>
                           <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="subject">Asunto</Label>
                              <Input
                                 id="subject"
                                 placeholder="Ingesa el asunto"
                              />
                           </div>
                           <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="message">Mensaje</Label>
                              <Textarea name="message" placeholder="Ingesa el mensaje" />
                           </div>
                        </div>
                     </form>
                  </CardContent>
                  <CardFooter className="flex">
                     <Button className="transition duration-150 ease-in-out hover:scale-110">
                        Enviar
                        <SendHorizonal
                           className="ml-3"
                           color="#fff"
                           size={16}
                        />
                     </Button>
                  </CardFooter>
               </Card>
            </div>
         </div>
      </section>
   );
}
