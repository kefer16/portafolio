"use client";

import TypographyH2 from "./typography-h2";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import Image from "next/image";
import {Button} from "./ui/button";
import Link from "next/link";
import TypographyLead from "./typografy-lead";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {Eye, Github} from "lucide-react";
import {Badge} from "@/components/ui/badge";

interface IProject {
    id: number,
    title: string;
    alt: string;
    src: string;
    description: string;
    technologies: string[];
    url: {
        live_demo: string;
        github: string;
    }
}

export default function Project() {
    const projects: IProject[] = [
        {
            id: 1,
            title: "Buscador de Países",
            alt: "imagen api contries",
            src: "/projects/api-contries.webp",
            description: "Sitio web para buscar paises por region donde se encontrara informacion esencial del país, esta información se extrae de la API de restcountries.com",
            technologies: [
                "HTML",
                "CSS",
                "TypeScript",
                "React",
            ],
            url: {
                live_demo: "https://apicountries-frontmentor-pjl8qxn75-kefer16.vercel.app/",
                github: "",
            }
        },
        {
            id: 2,
            title: "Vas APP",
            alt: "imagen vas app",
            src: "/projects/vas-app.webp",
            description: "Aplicación móvil para gestión de proyectos",
            technologies: [
                "StyleSheet",
                "TypeScript",
                "ReactNative",
            ],
            url: {
                live_demo: "",
                github: "",
            }
        },
        {
            id: 3,
            title: "Vas API",
            alt: "imagen vas swagger",
            src: "/projects/vas-swagger.webp",
            description: "API REST, para comunicar la aplicación móvil Vas con la base de datos",
            technologies: [
                "TypeScript",
                "NestJS",
                "Swagger",
                "MSSQL"
            ],
            url: {
                live_demo: "https://vasapi-production.up.railway.app/swagger",
                github: "",
            }
        },
        {
            id: 4,
            title: "Gamertec Website",
            alt: "imagen gamertec frontend",
            src: "/projects/gamertec-frontend-home.webp",
            description: "Carrito de compras de productos tecnológicos, se trabajó apartado de administrador y pagos con Mercado Pago",
            technologies: [
                "HTML",
                "CSS",
                "TypeScript",
                "React",
            ],
            url: {
                live_demo: "",
                github: "",
            }
        }
    ];
    return (
        <div
            id="projects"
            className="flex w-full px-5 justify-center min-h-screen"
        >
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-2 mt-[80px]">
                    <TypographyH2 text="Proyectos"/>
                    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {
                            projects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150 !p-0">
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        <AspectRatio ratio={4 / 3}>
                                            <Image
                                                className="w-full h-[300px] dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                                                alt={project.alt}
                                                fill
                                                src={project.src}
                                                loading="lazy"
                                            />
                                        </AspectRatio>
                                        <TypographyLead
                                            text={project.description}/>
                                        <div className="flex gap-2 flex-wrap">
                                            {
                                                project.technologies && project.technologies.length > 0 && project.technologies.map((technology, index) => (
                                                    <Badge key={index} className="text-gray-300 ">
                                                        {technology}
                                                    </Badge>
                                                ))
                                            }
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex mt-auto">
                                        <div className="w-full flex flex-row justify-between pt-3">
                                            {
                                                !project.url.live_demo &&
                                                <Button
                                                    variant="default"
                                                    disabled
                                                >
                                                    Live Demo
                                                    <Eye className="ml-3" color="#fff" size={16}/>
                                                </Button>
                                            }
                                            {
                                                project.url.live_demo &&
                                                <Link
                                                    href={project.url.live_demo}
                                                    target="_blank"
                                                >
                                                    <Button variant="default">
                                                        Live Demo
                                                        <Eye className="ml-3" color="#fff" size={16}/>
                                                    </Button>
                                                </Link>
                                            }

                                            {
                                                !project.url.github &&
                                                <Button variant="secondary" disabled>
                                                    GitHub
                                                    <Github className="ml-3" color="#fff" size={16}/>
                                                </Button>
                                            }
                                            {
                                                project.url.github &&
                                                <Link
                                                    href={project.url.github}
                                                    target="_blank"
                                                >
                                                    <Button variant="secondary">
                                                        GitHub
                                                        <Github className="ml-3" color="#fff" size={16}/>
                                                    </Button>
                                                </Link>
                                            }
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
