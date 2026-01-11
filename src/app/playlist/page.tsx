import HeaderSimply from "@/components/header-simply";
import IframeaSpotify from "@/components/iframe-spotify";
import { Card } from "@heroui/card"
import { Image } from "@heroui/image"
import { Suspense } from "react"

function LinksPage() {

   return (
      <>
         <HeaderSimply />
         <div className="flex justify-center items-center min-h-[calc(100vh-65px)] px-1 py-4">
            <Card shadow="sm" className="w-full md:w-[500px] bg-slate-50/10 py-8 px-4 flex flex-col gap-4">
               <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-2">
                     <Image
                        src="/foto.jpg"
                        width={120}
                        height={120}
                        alt={`foto de kefer`}
                        loading="lazy"
                        radius="full"
                     />
                  </div>
                  <div className="text-center gap-2">
                     <h1 className="text-xl font-bold text-center">@kefer.dev</h1>
                     <p className="text-base text-muted-foreground">De todo un poco...</p>
                  </div>
               </div>
               <div className="flex flex-col">
                  <div className="rounded-lg flex flex-col gap-2 overflow-hidden">
                     <p className="text-base text-foreground text-center">Playlist</p>

                     <Suspense
                        fallback={
                           <div className="flex items-center justify-center h-[352px]">
                              <p className="text-muted-foreground">Cargando playlist de Spotify...</p>
                           </div>
                        }>
                        <IframeaSpotify />
                     </Suspense>
                  </div>

                  {/* <Button startContent={<Github size={18} strokeWidth={2} color="#fff" />} as={Link} href="https://github.com/kefer16?tab=repositories" target="_blank" radius="lg" className="bg-black hover:scale-105" >Github</Button> */}

               </div>
            </Card>
         </div>

      </>
   )
}

export default LinksPage