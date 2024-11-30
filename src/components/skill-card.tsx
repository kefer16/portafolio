import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { ISkill } from '@/types/skill.interface'

function SkillCard({ skill }: ISkillCard) {
   const { name, src } = skill;
   return (
      <Card className="flex flex-col w-full transition ease-in-out duration-150 hover:-translate-y-2">
         <CardHeader className="text-center">
            <CardTitle>{name}</CardTitle>
         </CardHeader>
         <CardContent className="flex justify-center">
            <Image
               className="drop-shadow-[0_0_0.2rem_#ffffff50]"
               alt={`${name} icon`}
               width={100}
               height={100}
               src={src}
               loading="lazy"
            />
         </CardContent>
      </Card>
   )
}

interface ISkillCard {
   skill: ISkill
}

export default SkillCard