"use client";

import { MenusData } from "@/data/menus.data";
import { IMenu } from "@/types/menu.interface";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/navbar";
import { CandyCane, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";


function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [path, setPath] = useState<string>("");
   const { theme, setTheme } = useTheme()
   const menus = MenusData;

   return (
      <Navbar isBlurred isBordered >
         <NavbarContent justify="start" >
            <NavbarMenuToggle
               aria-label={isMenuOpen ? "Close menu" : "Open menu"}
               className="sm:hidden"
            />
            <NavbarBrand as={Link} href={"/#presentation"}>
               <Image
                  isBlurred
                  className="hidden dark:flex"
                  alt={`kefer logo`}
                  height={40}
                  src="/images/logo-dark.svg"
                  loading="lazy"

               />
               <Image
                  isBlurred
                  className="dark:hidden"
                  alt={`kefer logo`}
                  height={40}
                  src="/images/logo-light.svg"
                  loading="lazy"

               />
            </NavbarBrand>
         </NavbarContent>
         <NavbarContent className="hidden sm:flex gap-4" justify="center">
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

         <NavbarContent justify="end">
            <Button style={{ backgroundColor: theme === "dark" ? "#B11226" : "" }} isIconOnly startContent={theme === "light" ? <Moon size={20} strokeWidth={2} /> : <CandyCane size={20} strokeWidth={2} />} onPress={() => theme === "light" ? setTheme('dark') : setTheme('light')}></Button>

         </NavbarContent>

         <NavbarMenu>
            {MenusData.map((item, index) => (
               <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                     href={item.link}
                     className="w-full"
                     color={item.link === path ? "primary" : "foreground"}
                     onClick={() => setPath(item.link)}
                     size="lg"
                  >
                     {item.name}
                  </Link>
               </NavbarMenuItem>
            ))}
         </NavbarMenu>
      </Navbar >
   );
}

export default Header