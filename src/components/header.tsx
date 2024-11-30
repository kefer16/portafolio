import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { MenusData } from "@/data/menus.data";
import { IMenu } from "@/types/menu.interface";
import Link from "next/link";

function Header() {
   const menus = MenusData;
   return (
      <div className="fixed flex w-full border-b justify-center z-50 backdrop-blur">
         <div className="flex justify-center w-full max-w-[1440px]">
            <Menubar>
               {
                  menus.map((menu: IMenu) => (
                     <MenubarMenu key={menu.id}>
                        <Link href={menu.link}>
                           <MenubarTrigger>{menu.name}</MenubarTrigger>
                        </Link>
                     </MenubarMenu>
                  ))
               }
            </Menubar>
         </div>
      </div>
   );
}

export default Header