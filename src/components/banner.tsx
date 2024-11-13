import React from "react";
import TypographyH1 from "./typography-h1";
import TypographyP from "./typography-p";
import Image from "next/image";
import {Button} from "./ui/button";
import TypographyLead from "./typografy-lead";
import {AspectRatio} from "./ui/aspect-ratio";
import {ArrowDownToLine, Mail} from "lucide-react";
import Link from "next/link";
import TypographySpan from "./typography-span";

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
                <div
                    className="w-full px-5 flex flex-col gap-4 relative place-items-center md:flex-row md:justify-around">
                    <div className="w-full flex flex-col gap-2 md:w-2/4 md:gap-4">
                        <div className="flex flex-col gap-1">
                            <TypographySpan text="Hola, 👋" className="text-2xl font-semibold"/>
                            <div className="flex gap-2 items-end">
                                <TypographySpan text="Soy" className="text-4xl lg:text-5xl"/>
                                <TypographyH1 text="Kevin Morales"/>
                            </div>
                            <TypographyLead text="Técnico en Computación e Informática"/>
                        </div>
                        <TypographyP text="Un desarrollador apasionado con más de dos años de experiencia en la creación
                   y mantenimiento de aplicaciones web y de escritorio. Mi enfoque se centra en ofrecer 
                   soluciones eficientes y escalables tanto en el frontend como en el backend."/>
                        <div className="grid grid-cols-2 gap-4 md:flex md:flex-row">
                            <Button
                                className="w-full transition duration-150 ease-in-out hover:scale-110 md:w-min"
                                variant="default"
                            >
                                Descargar CV
                                <ArrowDownToLine
                                    className="ml-3"
                                    color="#fff"
                                    size={16}
                                />
                            </Button>
                            <Link href="mailto:morafi.1999.16@gmail.com">
                                <Button
                                    className="w-full transition duration-150 ease-in-out hover:scale-110 md:w-min"
                                    variant="secondary"
                                >
                                    Contacto
                                    <Mail className="ml-3" color="#fff" size={16}/>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-[250px] md:h-[250px]">
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                fill
                                className="relative dark:drop-shadow-[0_0_2rem_#0141ff3f] rounded-full"
                                src="/foto.webp"
                                alt="Next.js Logo"
                                priority
                            />
                        </AspectRatio>
                    </div>
                </div>
            </div>
        </div>
    );
}
