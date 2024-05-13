import Banner from "@/components/banner1";
import Contact from "@/components/contact";
import Skills from "@/components/skills";
import Header from "@/components/header";
import Project from "@/components/projects";

export default function Home() {
   return (
      <main className="flex flex-col ">
         <Header />
         <div id="home" className="flex flex-col min-h-screen justify-center">
            <Banner />
         </div>

         <Skills />
         <Project />
         <Contact />
      </main>
   );
}
