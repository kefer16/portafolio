import TypographyH2 from "@/components/typography-h2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillsData } from "@/data/skills.data";
import Image from "next/image";

export default function Skills() {
    const skills = SkillsData;
    return (
        <section id="skills" className="flex w-full px-5 justify-center min-h-screen">
            <div className="flex flex-col mt-[80px] w-full max-w-[1440px] py-5">
                <TypographyH2>Habilidades</TypographyH2>
                <div className="w-full md:w-[600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                    {
                        skills && skills.map((skill) => (
                            <Card key={skill.name} className="flex flex-col w-full transition ease-in-out duration-150 hover:-translate-y-2">
                                <CardHeader className="text-center">
                                    <CardTitle>{skill.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-center">
                                    <Image
                                        className="drop-shadow-[0_0_0.2rem_#ffffff82]"
                                        alt={`${skill.name} icon`}
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
        </section>
    );
}
