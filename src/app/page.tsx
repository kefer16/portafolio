import Header from "@/components/header";
import Experience from "@/sections/experience.section";
import Presentation from "@/sections/presentation.section";
import Project from "@/sections/projects.section";
import Technologies from "@/sections/technologies.section";

function Home() {
   return (
      <>
         <Header />
         <Presentation />
         <Project />
         <Experience />
         <Technologies />
      </>
   );
}

export default Home