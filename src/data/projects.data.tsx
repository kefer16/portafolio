import { IProject } from "@/types/project.interface";

export const ProjectData: IProject[] = [
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