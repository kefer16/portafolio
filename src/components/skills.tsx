import React from "react";
import TypographyH2 from "./typography-h2";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import Image from "next/image";

interface ISkill {
    name: string,
    src: string,
}

export default function Skills() {
    const skills: ISkill[] = [
        {

            name: "HTML",
            src: "/svg/html.svg",
        },
        {

            name: "CSS",
            src: "/svg/css.svg",
        },
        {

            name: "JS",
            src: "/svg/js.svg",
        },
        {

            name: "React",
            src: "/svg/react.svg",
        },
        {

            name: "Angular",
            src: "/svg/angular.svg",
        },
        {

            name: "Next.js",
            src: "/svg/nextjs.svg",
        },
        {

            name: "Swagger",
            src: "/svg/swagger.svg",
        },
        {

            name: "NestJS",
            src: "/svg/nest.svg",
        },
        {

            name: "C#",
            src: "/svg/cisharp.svg",
        },
        {

            name: "SQL",
            src: "/svg/sql.svg",
        },
        {

            name: "Spring",
            src: "/svg/spring.svg",
        },
        {

            name: "Git",
            src: "/svg/git.svg",
        },

    ]

    return (
        <div id="skills" className="flex w-full px-5 justify-center min-h-screen">
            <div className="flex flex-col mt-[80px] w-full max-w-[1440px] py-5">
                <TypographyH2 text="Habilidades"/>
                <div className="w-full md:w-[600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                    {
                       skills && skills.map((skill: ISkill) => (
                            <Card
                                key={skill.name}
                                className="flex flex-col w-full transition ease-in-out  hover:-translate-y-2 duration-150">
                                <CardHeader className="text-center">
                                    <CardTitle>{skill.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-center">
                                    <Image
                                        className="dark:drop-shadow-[0_0_0.2rem_#ffffff50]"
                                        alt="html icon"
                                        width={100}
                                        height={100}
                                        src={skill.src}
                                        loading="lazy"
                                    />
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
