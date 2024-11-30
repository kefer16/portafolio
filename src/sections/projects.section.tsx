"use client";

import TypographyH2 from "../components/typography-h2";
import { ProjectData } from "@/data/projects.data";
import { IProject } from "@/types/project.interface";
import ProjectCard from "@/components/project-card";

function Project() {
    const projects: IProject[] = ProjectData;
    return (
        <section id="projects" className="flex w-full px-5 justify-center min-h-screen" >
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-2 mt-[80px]">
                    <TypographyH2>Proyectos</TypographyH2>
                    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {
                            projects && projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Project