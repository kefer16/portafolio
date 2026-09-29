"use client";

import { MenusData } from "@/data/menus.data";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { CandyCane, Ghost, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ChristmasLights from "@/components/christmas-lights";
import SpookyCobwebs from "@/components/spooky-cobwebs";

const THEME_OPTIONS = {
   space: { label: "Espacio", icon: Moon, bg: undefined },
   christmas: { label: "Navideño", icon: CandyCane, bg: "#B11226" },
   halloween: { label: "Halloween", icon: Ghost, bg: "#ff7518" },
} as const;

type ThemeKey = keyof typeof THEME_OPTIONS;

function ThemeMenu() {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   const current: ThemeKey = mounted && theme && theme in THEME_OPTIONS ? (theme as ThemeKey) : "space";
   const { icon: CurrentIcon, bg } = THEME_OPTIONS[current];

   return (
      <Dropdown classNames={{ content: "bg-popover text-popover-foreground" }}>
         <DropdownTrigger>
            <Button
               isIconOnly
               aria-label="Cambiar tema"
               style={bg ? { backgroundColor: bg } : undefined}
               startContent={<CurrentIcon size={20} strokeWidth={2} color={bg ? "#fff" : undefined} />}
            />
         </DropdownTrigger>
         <DropdownMenu
            aria-label="Selector de tema"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={[current]}
            onAction={(key) => setTheme(key as string)}
         >
            {Object.entries(THEME_OPTIONS).map(([key, { label, icon: Icon }]) => (
               <DropdownItem key={key} className="text-popover-foreground" startContent={<Icon size={18} strokeWidth={2} />}>
                  {label}
               </DropdownItem>
            ))}
         </DropdownMenu>
      </Dropdown>
   );
}

function HeaderSimply() {
   return (
      // sticky on this wrapper too, not just the Navbar - see header.tsx for
      // why a plain "relative" div here defeats HeroUI's own sticky Navbar.
      <div className="sticky top-0 z-40 relative">
         <Navbar isBlurred isBordered >
            <NavbarContent justify="start" >
               <NavbarBrand as={Link} href={"/#presentation"}>
                  <Image
                     isBlurred
                     alt={`kefer logo`}
                     height={40}
                     src="/images/logo-dark.svg"
                     loading="lazy"
                  />
               </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
               <ThemeMenu />
            </NavbarContent>
         </Navbar >
         <div className="absolute -bottom-8 inset-x-0 z-0">
            <ChristmasLights />
         </div>
         <SpookyCobwebs />
      </div>
   );
}

export default HeaderSimply
