import SkillCard from "@/components/skill-card";
import TypographyH2 from "@/components/typography-h2";
import TypographyH3 from "@/components/typography-h3";
import { TecnologyData } from "@/data/technologies.data";
import FadeIn from "@/components/motion/fade-in";
import { ISkill } from "@/types/technology.interface";

function SkillGroup({ title, skills }: { title: string; skills: ISkill[] }) {
    return (
        <FadeIn className="w-full flex flex-col gap-4 md:w-[800px] mx-auto">
            <TypographyH3>{title}</TypographyH3>
            <div className="w-full px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {
                    skills && skills.map((skill, index) => (
                        <FadeIn key={skill.name} delay={(index % 4) * 0.05} duration={0.35}>
                            <SkillCard skill={skill} />
                        </FadeIn>
                    ))
                }
            </div>
        </FadeIn>
    );
}

function Technologies() {
    const technologies = TecnologyData;
    return (
        <section id="technologies" className="flex w-full px-5 justify-center min-h-screen">
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-8 mt-[80px]">
                    <FadeIn>
                        <TypographyH2>Tecnologías</TypographyH2>
                    </FadeIn>
                    <SkillGroup title="Lenguajes de programación" skills={technologies?.programming_languages} />
                    <SkillGroup title="Marcado y Diseño" skills={technologies?.layout_and_design} />
                    <SkillGroup title="Gestor de bases de datos" skills={technologies?.database_manager} />
                    <SkillGroup title="Frameworks" skills={technologies?.frameworks} />
                    <SkillGroup title="Utilidades" skills={technologies?.utilities} />
                </div>

            </div>
        </section>
    );
}

export default Technologies