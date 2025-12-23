import { IExperience } from "@/types/experience.interface"
import { Chip } from "@heroui/chip";

function ExperienceCard({ experience }: IExperienceCard) {
   const { job_position, company, time, descriptions, technologies } = experience;
   return (
      <div className="relative mx-12 pb-12 grid before:absolute before:left-[-35px] before:block before:h-full before:border-l-2 before:border-white/15 before:content-[''] md:grid-cols-5 md:gap-10 md:space-x-4] group">
         <div className="relative pb-12 md:col-span-2">
            <div className="sticky top-0">
               <span className="text-primary -left-[44px] -top-3 absolute rounded-full text-5xl transition ease-in-out duration-150 group-hover:text-primary lg:text-gray-500">•</span>
               <h3 className="text-2xl font-bold text-primary transition ease-in-out duration-150 group-hover:text-primary lg:text-muted-foreground">{job_position}</h3>
               <h4 className="font-semibold text-xl">{company}</h4>
               <time className="p-0 m-0 text-muted-foreground text-sm">{time}</time>
            </div>
         </div>
         <div className="relative w-full flex flex-col md:col-span-3 gap-4">
            <div className="flex flex-col gap-1">
               {
                  descriptions && descriptions.map((description, index) => (
                     <li key={index} className="text-foreground">
                        {description}
                     </li>
                  ))
               }
            </div>
            <div className="flex gap-2 flex-wrap">
               {
                  technologies && technologies.length > 0 && technologies.map((technology, index) => (
                     <Chip key={index}>
                        {technology}
                     </Chip>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

interface IExperienceCard {
   experience: IExperience
}

export default ExperienceCard