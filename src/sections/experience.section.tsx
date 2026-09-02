import { ExperiencesData } from "@/data/experiencies.data";
import { IExperience } from "@/types/experience.interface";
import TypographyH2 from "@/components/typography-h2";
import ExperienceCard from "@/components/experience-card";
import FadeIn from "@/components/motion/fade-in";

function Experience() {
    const experiences: IExperience[] = ExperiencesData;
    return (
        <section id="experience" className="flex w-full px-5 justify-center min-h-screen" >
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-2 mt-[80px]">
                    <FadeIn>
                        <TypographyH2>Experiencia</TypographyH2>
                    </FadeIn>
                    <div className="w-full grid grid-cols-1 mt-5">
                        {
                            experiences && experiences.map((experience) => (
                                <FadeIn key={experience.id} direction="left">
                                    <ExperienceCard experience={experience} />
                                </FadeIn>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience