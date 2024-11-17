import Header from "@/components/header.component";
import Experience from "@/sections/experience.section";
import Presentation from "@/sections/presentation.section";
import Project from "@/sections/projects.section";
import Skills from "@/sections/skills.section";

export default function Home() {
   return (
      <main className="flex flex-col">
         <Header />
         <Presentation />
         <Skills />
         <Project />
         <Experience />
         {/* <Contact /> */}
      </main>
   );
}
