// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import Image from 'next/image'
import { ISkill } from "@/types/skill.interface"
import { Image } from "@heroui/image";
import TypographyH3 from "./typography-h3";

function SkillCard({ skill }: ISkillCard) {
   const { name, src } = skill;
   return (
      <div className="flex flex-col justify-center items-center">
         <div className="text-center">
            <TypographyH3>{name}</TypographyH3>
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