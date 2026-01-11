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


function HeaderSimply() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [path, setPath] = useState<string>("");
   const { theme, setTheme } = useTheme()
   const menus = MenusData;

   return (
      <Navbar isBlurred isBordered >
         <NavbarContent justify="start" >
            {/* <NavbarMenuToggle
               aria-label={isMenuOpen ? "Close menu" : "Open menu"}
               className="sm:hidden"
            /> */}
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


         <NavbarContent justify="end">
            <Button className="hidden dark:flex" style={{ backgroundColor: "#B11226" }} isIconOnly startContent={<CandyCane size={20} strokeWidth={2} />} onPress={() => theme === "light" ? setTheme('dark') : setTheme('light')}></Button>
            <Button className="dark:hidden" isIconOnly startContent={<Moon size={20} strokeWidth={2} />} onPress={() => theme === "light" ? setTheme('dark') : setTheme('light')}></Button>
         </NavbarContent>
      </Navbar >
   );
}

export default HeaderSimply