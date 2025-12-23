"use client";

import { MenusData } from "@/data/menus.data";
import { IMenu } from "@/types/menu.interface";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { CandyCane, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";


function Header() {
   const [path, setPath] = useState<string>("");
   const { theme, setTheme } = useTheme()
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
            <Button style={{ backgroundColor: theme === "dark" ? "#B11226" : "" }} isIconOnly startContent={theme === "light" ? <Moon size={20} strokeWidth={2} /> : <CandyCane size={20} strokeWidth={2} />} onPress={() => theme === "light" ? setTheme('dark') : setTheme('light')}></Button>
         </NavbarContent  >
      </Navbar >
   );
}

export default Header