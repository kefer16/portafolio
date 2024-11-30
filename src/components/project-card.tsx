import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Image from "next/image"
import TypographyLead from "./typografy-lead"
import { Eye, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IProject } from "@/types/project.interface"
import { Badge } from "@/components/ui/badge";

function ProjectCard({ project }: IProjectCard) {
   const { title, alt, src, description, technologies, url } = project;
   return (
      <Card className="flex flex-col w-full !p-0 group">
         <CardHeader>
            <CardTitle>{title}</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-4">
            <AspectRatio ratio={4 / 3}>
               <Image
                  className="w-full h-[300px] transition ease-in-out duration-150 group-hover:grayscale-0 lg:grayscale"
                  alt={alt}
                  fill
                  src={src}
                  loading="lazy"
               />
            </AspectRatio>
            <TypographyLead>{description}</TypographyLead>
            <div className="flex gap-2 flex-wrap">
               {
                  technologies && technologies.length > 0 && technologies.map((technology, index) => (
                     <Badge key={index} className="text-gray-300 transition ease-in-out duration-150 group-hover:bg-primary lg:bg-gray-500">
                        {technology}
                     </Badge>
                  ))
               }
            </div>
         </CardContent>
         <CardFooter className="flex mt-auto">
            <div className="w-full flex flex-row justify-between pt-3">
               {
                  !url.live_demo &&
                  <Button variant="default" disabled >
                     Live Demo
                     <Eye className="ml-3" color="#fff" size={16} />
                  </Button>
               }
               {
                  url.live_demo &&
                  <Link href={url.live_demo} target="_blank" >
                     <Button variant="default">
                        Live Demo
                        <Eye className="ml-3" color="#fff" size={16} />
                     </Button>
                  </Link>
               }
               {
                  !url.github &&
                  <Button variant="secondary" disabled>
                     GitHub
                     <Github className="ml-3" color="#fff" size={16} />
                  </Button>
               }
               {
                  url.github &&
                  <Link href={url.github} target="_blank" >
                     <Button variant="secondary">
                        GitHub
                        <Github className="ml-3" color="#fff" size={16} />
                     </Button>
                  </Link>
               }
            </div>
         </CardFooter>
      </Card>
   )
}

interface IProjectCard {
   project: IProject
}

export default ProjectCard