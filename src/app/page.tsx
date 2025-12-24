import Header from "@/components/header";
import Experience from "@/sections/experience.section";
import Presentation from "@/sections/presentation.section";
import Project from "@/sections/projects.section";
import Technologies from "@/sections/technologies.section";

function Home() {
   return (
      <main className="relative flex flex-col z-20">
         <Header />
         <Presentation />
         <Project />
         <Experience />
         <Technologies />
      </main>
   );
}

export default Home