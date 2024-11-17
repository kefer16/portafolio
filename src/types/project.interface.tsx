export interface IProject {
   id: number,
   title: string;
   alt: string;
   src: string;
   description: string;
   technologies: string[];
   url: {
      live_demo: string;
      github: string;
   }
}