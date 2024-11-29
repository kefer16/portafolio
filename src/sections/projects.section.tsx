"use client";

import TypographyH2 from "../components/typography-h2";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../components/ui/card";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import TypographyLead from "../components/typografy-lead";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Eye, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectData } from "@/data/projects.data";
import { IProject } from "@/types/project.interface";

export default function Project() {
    const projects: IProject[] = ProjectData;
    return (
        <section id="projects" className="flex w-full px-5 justify-center min-h-screen" >
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-2 mt-[80px]">
                    <TypographyH2>Proyectos</TypographyH2>
                    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {
                            projects && projects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="flex flex-col w-full !p-0 group">
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        <AspectRatio ratio={4 / 3}>
                                            <Image
                                                className="w-full h-[300px] transition ease-in-out duration-150 group-hover:grayscale-0 lg:grayscale"
                                                alt={project.alt}
                                                fill
                                                src={project.src}
                                                loading="lazy"
                                            />
                                        </AspectRatio>
                                        <TypographyLead>{project.description}</TypographyLead>
                                        <div className="flex gap-2 flex-wrap">
                                            {
                                                project.technologies && project.technologies.length > 0 && project.technologies.map((technology, index) => (
                                                    <Badge key={index} className="text-gray-300 bg-gray-500 transition ease-in-out duration-150 group-hover:bg-primary">
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
                                                <Button variant="default" disabled >
                                                    Live Demo
                                                    <Eye className="ml-3" color="#fff" size={16} />
                                                </Button>
                                            }
                                            {
                                                project.url.live_demo &&
                                                <Link href={project.url.live_demo} target="_blank" >
                                                    <Button variant="default">
                                                        Live Demo
                                                        <Eye className="ml-3" color="#fff" size={16} />
                                                    </Button>
                                                </Link>
                                            }
                                            {
                                                !project.url.github &&
                                                <Button variant="secondary" disabled>
                                                    GitHub
                                                    <Github className="ml-3" color="#fff" size={16} />
                                                </Button>
                                            }
                                            {
                                                project.url.github &&
                                                <Link href={project.url.github} target="_blank" >
                                                    <Button variant="secondary">
                                                        GitHub
                                                        <Github className="ml-3" color="#fff" size={16} />
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
        </section>
    );
}
