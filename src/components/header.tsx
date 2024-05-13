import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSeparator,
   MenubarShortcut,
   MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
export default function Header() {
   return (
      <div className="fixed flex w-full justify-center z-50">
         <div className="flex justify-center w-full max-w-[1440px] py-10">
            <Menubar>
               <MenubarMenu>
                  <Link href="#home">
                     <MenubarTrigger>Inicio</MenubarTrigger>
                  </Link>
               </MenubarMenu>
               <MenubarMenu>
                  <Link href="#skills">
                     <MenubarTrigger>Habilidades</MenubarTrigger>
                  </Link>
               </MenubarMenu>
               <MenubarMenu>
                  <Link href="#projects">
                     <MenubarTrigger>Proyectos</MenubarTrigger>
                  </Link>
               </MenubarMenu>
               <MenubarMenu>
                  <Link href="#contact">
                     <MenubarTrigger>Contacto</MenubarTrigger>
                  </Link>
               </MenubarMenu>
            </Menubar>
         </div>
      </div>
   );
}
