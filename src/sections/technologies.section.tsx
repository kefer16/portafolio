import SkillCard from "@/components/skill-card";
import TypographyH2 from "@/components/typography-h2";
import TypographyH3 from "@/components/typography-h3";
import { TecnologyData } from "@/data/technologies.data";

function Technologies() {
    const technologies = TecnologyData;
    return (
        <section id="technologies" className="flex w-full px-5 justify-center min-h-screen">
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-8 mt-[80px]">
                    <TypographyH2>Tecnologías</TypographyH2>
                    <div className="w-full flex flex-col gap-4 md:w-[800px] mx-auto">
                        <TypographyH3>Lenguajes de programación</TypographyH3>
                        <div className="w-full px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {
                                technologies && technologies.programming_languages.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:w-[800px] mx-auto">
                        <TypographyH3>Marcado y Diseño</TypographyH3>
                        <div className="w-full px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {
                                technologies && technologies.layout_and_design.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:w-[800px] mx-auto">
                        <TypographyH3>Gestor de bases de datos</TypographyH3>
                        <div className="w-full px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {
                                technologies && technologies.database_manager.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:w-[800px] mx-auto">
                        <TypographyH3>Frameworks</TypographyH3>
                        <div className="w-full px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {
                                technologies && technologies.frameworks.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:w-[800px] mx-auto">
                        <TypographyH3>Utilidades</TypographyH3>
                        <div className="w-full px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {
                                technologies && technologies.utilities.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))
                            }
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Technologies