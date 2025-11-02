import { Button } from "@heroui/button"
import { Card } from "@heroui/card"
import { Image } from "@heroui/image"
import { Github } from "lucide-react"
import Link from "next/link"

function LinksPage() {
   return (
      <main className="flex flex-col h-screen justify-center items-center px-8">
         <Card className="w-full md:w-[500px]  bg-slate-50/5 p-8 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-3">
               <div className="flex">
                  <Image
                     src="/foto.jpg"
                     width={120}
                     height={120}
                     alt={`foto de kefer`}
                     loading="lazy"
                     radius="full"

                  />
               </div>
               <h1 className="text-xl font-bold">@kefer.dev</h1>
            </div>
            <div className="flex flex-col gap-6">
               <div className="bg-black p-4 rounded-lg flex flex-col gap-2 overflow-hidden">
                  <p className="text-center">Playlist</p>
                  <iframe
                     data-testid="embed-iframe"
                     className="rounded-2xl"
                     src="https://open.spotify.com/embed/playlist/5rwfXnar8fE9dnxzrupp0F?utm_source=generator&theme=0"
                     width="100%"
                     height="352"
                     allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                     loading="lazy"
                  >
                  </iframe>
               </div>


               <Button startContent={<Github size={18} strokeWidth={2} color="#fff" />} as={Link} href="https://github.com/kefer16?tab=repositories" target="_blank" radius="lg" className="bg-black hover:scale-105" >Github</Button>

            </div>
         </Card>
      </main>
   )
}

export default LinksPage