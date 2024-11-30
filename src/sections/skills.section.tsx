import SkillCard from "@/components/skill-card";
import TypographyH2 from "@/components/typography-h2";
import { SkillsData } from "@/data/skills.data";

function Skills() {
    const skills = SkillsData;
    return (
        <section id="skills" className="flex w-full px-5 justify-center min-h-screen">
            <div className="flex flex-col mt-[80px] w-full max-w-[1440px] py-5">
                <TypographyH2>Habilidades</TypographyH2>
                <div className="w-full md:w-[600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                    {
                        skills && skills.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Skills