import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import TypographyLead from "./typografy-lead"
import { CircleOff, Dot, ExternalLink, Eye, Github } from "lucide-react"
// import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IProject } from "@/types/project.interface"
import { Badge } from "@/components/ui/badge";
import { Image } from "@heroui/image"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Chip } from "@heroui/chip"
import TypographyH3 from "./typography-h3"
import { Button } from "@heroui/button"

function ProjectCard({ project }: IProjectCard) {
   const { title, alt, src, description, technologies, url } = project;
   return (
      <Card className="bg-slate-50/5 p-3 flex flex-col w-full group">
         <CardHeader>
            <TypographyH3>{title}</TypographyH3>
         </CardHeader>
         <CardBody className="flex flex-col gap-4">
            <AspectRatio ratio={4 / 3}>
               <Image
                  // isBlurred
                  className="w-full transition ease-in-out duration-150 group-hover:grayscale-0 lg:grayscale"
                  alt={alt}
                  // width={600}
                  src={src}
                  loading="lazy"
               />
            </AspectRatio>
            <TypographyLead>{description}</TypographyLead>
            <div className="flex gap-2 flex-wrap">
               {
                  technologies && technologies.length > 0 && technologies.map((technology, index) => (
                     <Chip key={index} className="transition ease-in-out duration-150 group-hover:bg-primary lg:bg-muted">
                        {technology}
                     </Chip>
                  ))
               }
            </div>
         </CardBody>
         <CardFooter className="flex mt-auto">
            <div className="w-full flex flex-row justify-between pt-3">
               {
                  !url.live_demo &&
                  <Button color="primary" isDisabled>
                     Offline
                     <CircleOff className="ml-3" color="#fff" size={16} />
                  </Button>
               }
               {
                  url.live_demo &&
                  <Link href={url.live_demo} target="_blank" >
                     <Button color="primary">
                        Online Demo
                        <ExternalLink className="ml-3" color="#fff" size={16} />
                     </Button>
                  </Link>
               }
               {
                  !url.github &&
                  <Button color="secondary" isDisabled>
                     GitHub
                     <Github className="ml-3" color="#fff" size={16} />
                  </Button>
               }
               {
                  url.github &&
                  <Link href={url.github} target="_blank" >
                     <Button color="secondary">
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