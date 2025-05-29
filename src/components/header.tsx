"use client"

import { MenusData } from "@/data/menus.data";
import { IMenu } from "@/types/menu.interface";
import { Link } from "@heroui/link";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useState } from "react";


function Header() {
   const [path, setPath] = useState<string>("");
   const menus = MenusData;
   return (
      <Navbar isBlurred isBordered >
         <NavbarContent className="w-full flex !justify-center gap-4">
            {
               menus.map((menu: IMenu) => (
                  <NavbarItem key={menu.id} >
                     <Link
                        size="md"
                        className="font-semibold"
                        color={menu.link === path ? "primary" : "foreground"}
                        href={menu.link}
                        onClick={() => setPath(menu.link)}>
                        {menu.name}
                     </Link>
                  </NavbarItem>
               ))
            }
         </NavbarContent  >
      </Navbar >
   );
}

export default Header