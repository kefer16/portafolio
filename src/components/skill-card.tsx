import { ISkill } from "@/types/technology.interface"
import { Image } from "@heroui/image";
import TypographyH4 from "./typography-h4";

function SkillCard({ skill }: ISkillCard) {
   const { name, src } = skill;
   return (
      <div className="flex flex-col justify-center items-center hover:-translate-y-2 ease-in-out duration-300">
         <div className="text-center">
            <TypographyH4>{name}</TypographyH4>
         </div>
         <Image
            isBlurred
            className="p-5 drop-shadow-[0_0_0.5rem_#ffffff50]"
            alt={`${name} icon`}
            height={150}
            src={src}
            loading="lazy"
         />
      </div>
   )
}

interface ISkillCard {
   skill: ISkill
}

export default SkillCard