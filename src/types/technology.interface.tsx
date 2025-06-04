export interface ITecnology {
   programming_languages: ISkill[];
   layout_and_design: ISkill[];
   database_manager: ISkill[];
   frameworks: ISkill[];
   utilities: ISkill[];
}

export interface ISkill {
   name: string,
   src: string,
}