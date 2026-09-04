import { Button } from "@heroui/button";
import Link from "next/link";
import HeaderSimply from "@/components/header-simply";


export default function NotFound() {
   return (
      <>
         <HeaderSimply />
         <div className="flex flex-col justify-center items-center flex-1 gap-6">
            <div className="flex flex-col gap-2 text-center">
               <h2 className="text-8xl font-bold">404</h2>
               <p className="text-base text-muted-foreground">Esta página no se pudo encontrar</p>
            </div>
            <Link href="/">
               <Button color="default" size="md" variant="shadow">Regresar a principal</Button>
            </Link>
         </div>
      </>
   )
}