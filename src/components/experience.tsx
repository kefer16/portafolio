import TypographyH2 from "./typography-h2";
import {Badge} from "@/components/ui/badge";

interface IExperience {
    id: string;
    job_position: string;
    company: string;
    time: string;
    descriptions: string[];
    technologies: string[];
}

export default function Experience() {

    const experiences: IExperience[] = [
        {
            id: "1",
            job_position: "Asistente de Desarrollo",
            company: "Caja Trujillo",
            time: "noviembre 2022 – Actualidad",
            descriptions: [
                "Proximamente ...",
            ],
            technologies: [
                "C#",
                "Visual Basic",
                "SQL",
                "JavaScript",
                "TypeScript",
                "Angular",
                "Git"
            ]
        },
        {
            id: "2",
            job_position: "Auxiliar de Desarrollo",
            company: "Nisira Systems S.A.C.",
            time: "enero 2022 – septiembre 2022",
            descriptions: [
                "Creación de formularios y diseño, para el sistema Nisira ERP de Escritorio.",
                "Creación de procedimientos almacenados, para la comunicacion entre el sistema y la base de datos",
                "Soporte a incidencias, para sistema Nisira ERP.",
                "Creación de API's REST para facturación electrónica, SUNAT."
            ],
            technologies: [
                "VFP",
                "SQL",
                "JavaScript",
                "TypeScript",
                "Express",
                "Spring",
                "Git"
            ]
        },
        {
            id: "3",
            job_position: "Sistemas",
            company: "Husat GPS S.A.C.",
            time: "diciembre 2020 – junio 2021",
            descriptions: [
                "Creación de formularios y diseño, para el sistema de Husat Ventas de Escritorio.",
                "Creación de procedimientos almacenados, para la comunicacion entre el sistema y la base de datos",
                "Soporte a incidencias, para Husat Ventas.",
            ],
            technologies: [
                "C#",
                "SQL",
                "Git"
            ]
        },
        {
            id: "4",
            job_position: "Soporte Técnico",
            company: "Grupo FG",
            time: "enero 2019 – marzo 2020",
            descriptions: [
                "Soporte de hardware a equipos de cómputo, tanto preventivo como correctivo.",
                "Instalación y configuración de software para empresas",
                "Contacto con el fabricante de la marca para la gestion de garantia del equipo."],
            technologies: [
                "LG",
                "LENOVO",
                "DELL"
            ]
        }
    ]

    return (
        <div
            id="experience"
            className="flex w-full px-5 justify-center min-h-screen"
        >
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-2 mt-[80px]">
                    <TypographyH2 text="Experiencia"/>
                    <div className="w-full grid grid-cols-1 mt-5">
                        {

                            experiences && experiences.map((experience) => (
                                    <div key={experience.id}
                                         className="relative mx-12 pb-12 grid before:absolute before:left-[-35px] before:block before:h-full before:border-l-2 before:border-black/20 dark:before:border-white/15 before:content-[''] md:grid-cols-5 md:gap-10 md:space-x-4]">
                                        <div className="relative pb-12 md:col-span-2">
                                            <div className="sticky top-0">
                                                <span
                                                    className="text-primary -left-[44px] -top-3 absolute rounded-full text-5xl">•</span>
                                                <h3 className="text-2xl font-bold text-primary">{experience.job_position}</h3>
                                                <h4 className="font-semibold text-xl dark:text-white">{experience.company}</h4>
                                                <time
                                                    className="p-0 m-0 text-sm dark:text-white/60">{experience.time}
                                                </time>
                                            </div>
                                        </div>
                                        <div className="relative w-full flex flex-col md:col-span-3 gap-4">
                                            <div className="flex flex-col gap-1">
                                                {
                                                    experience.descriptions && experience.descriptions.map((description, index) => (
                                                        <li key={index}
                                                            className="text-xl text-gray-300 ">
                                                            {description}
                                                        </li>
                                                    ))
                                                }
                                            </div>
                                            <div className="flex gap-2 flex-wrap">
                                                {
                                                    experience.technologies && experience.technologies.length > 0 && experience.technologies.map((technology, index) => (
                                                        <Badge key={index} className="text-gray-300 ">
                                                            {technology}
                                                        </Badge>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    </div>
                                )
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
