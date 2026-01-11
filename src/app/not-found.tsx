import { Button } from "@heroui/button";
import Link from "next/link";


export default function NotFound() {
   return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-6">
         <div className="flex flex-col gap-2 text-center">
            <h2 className="text-8xl font-bold">404</h2>
            <p className="text-base text-muted-foreground">Esta página no se pudo encontrar</p>
         </div>
         <Button as={Link} href="/" color="default" size="md" variant="shadow">Regresar a principal</Button>
      </div>
   )
}