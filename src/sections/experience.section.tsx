import { ExperiencesData } from "@/data/experiencies.data";
import { Badge } from "@/components/ui/badge";
import { IExperience } from "@/types/experience.interface";
import TypographyH2 from "@/components/typography-h2";

export default function Experience() {
    const experiences: IExperience[] = ExperiencesData;
    return (
        <section id="experience" className="flex w-full px-5 justify-center min-h-screen" >
            <div className="flex flex-col w-full max-w-[1440px] py-5">
                <div className="flex flex-col gap-2 mt-[80px]">
                    <TypographyH2>Experiencia</TypographyH2>
                    <div className="w-full grid grid-cols-1 mt-5">
                        {
                            experiences && experiences.map((experience) => (
                                <div key={experience.id}
                                    className="relative mx-12 pb-12 grid before:absolute before:left-[-35px] before:block before:h-full before:border-l-2 before:border-white/15 before:content-[''] md:grid-cols-5 md:gap-10 md:space-x-4] group">
                                    <div className="relative pb-12 md:col-span-2">
                                        <div className="sticky top-0">
                                            <span className="text-gray-500 -left-[44px] -top-3 absolute rounded-full text-5xl transition ease-in-out duration-150 group-hover:text-primary">•</span>
                                            <h3 className="text-2xl font-bold text-gray-500 transition ease-in-out duration-150 group-hover:text-primary">{experience.job_position}</h3>
                                            <h4 className="font-semibold text-xl">{experience.company}</h4>
                                            <time className="p-0 m-0 text-sm text-white/60">{experience.time}</time>
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-col md:col-span-3 gap-4">
                                        <div className="flex flex-col gap-1">
                                            {
                                                experience.descriptions && experience.descriptions.map((description, index) => (
                                                    <li key={index} className="text-xl text-gray-300 ">
                                                        {description}
                                                    </li>
                                                ))
                                            }
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {
                                                experience.technologies && experience.technologies.length > 0 && experience.technologies.map((technology, index) => (
                                                    <Badge key={index} className="text-gray-300 bg-gray-500 transition ease-in-out duration-150 group-hover:bg-primary">
                                                        {technology}
                                                    </Badge>
                                                ))
                                            }
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}
