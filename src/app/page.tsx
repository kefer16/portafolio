import Banner from "@/components/Banner";
import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col">
         <Header />
         <Banner />
      </main>
   );
}
