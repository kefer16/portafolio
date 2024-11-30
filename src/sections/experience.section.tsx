import { ExperiencesData } from "@/data/experiencies.data";
import { IExperience } from "@/types/experience.interface";
import TypographyH2 from "@/components/typography-h2";
import ExperienceCard from "@/components/experience-card";

function Experience() {
    const experiences: IExperience[] = ExperiencesData;
    return (
        <section id="experience" className="flex w-full px-5 justify-center min-h-screen" >
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-2 mt-[80px]">
                    <TypographyH2>Experiencia</TypographyH2>
                    <div className="w-full grid grid-cols-1 mt-5">
                        {
                            experiences && experiences.map((experience) => (
                                <ExperienceCard key={experience.id} experience={experience} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience