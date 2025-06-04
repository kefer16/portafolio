import { IExperience } from "@/types/experience.interface";

export const ExperiencesData: IExperience[] = [
   {
      id: "1",
      job_position: "Asistente de Desarrollo",
      company: "Caja Trujillo",
      time: "noviembre 2022 – Actualidad",
      descriptions: [
         "Próximamente ...",
      ],
      technologies: [
         "C#",
         "Visual Basic",
         "MSSQL",
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
         "MSSQL",
         "Express",
         "TypeScript",
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
         "MSSQL",
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