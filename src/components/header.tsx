"use client";

import { MenusData } from "@/data/menus.data";
import { IMenu } from "@/types/menu.interface";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/navbar";
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

// The theme is only known once mounted on the client (next-themes reads
// localStorage) - defaulting to "space" until then matches the provider's
// own defaultTheme and avoids a server/client mismatch on first paint.
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

function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [path, setPath] = useState<string>("");
   const menus = MenusData;

   return (
      <div className="relative">
         <Navbar isBlurred isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent justify="start" >
               <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
               />
               <NavbarBrand as={Link} href={"/#presentation"}>
                  {/* All three themes are dark scenes now, so the light-
                     colored logo variant applies everywhere - no per-theme
                     swap needed anymore. */}
                  <Image
                     isBlurred
                     alt={`kefer logo`}
                     height={40}
                     src="/images/logo-dark.svg"
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
                           className={`font-semibold ${menu.link === path ? "underline underline-offset-4" : ""}`}
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
               <ThemeMenu />
            </NavbarContent>

            <NavbarMenu>
               {MenusData.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                     <Link
                        href={item.link}
                        className={`w-full ${item.link === path ? "underline underline-offset-4" : ""}`}
                        color={item.link === path ? "primary" : "foreground"}
                        onClick={() => {
                           setPath(item.link);
                           setIsMenuOpen(false);
                        }}
                        size="lg"
                     >
                        {item.name}
                     </Link>
                  </NavbarMenuItem>
               ))}
            </NavbarMenu>
         </Navbar >
         <div className="absolute -bottom-8 inset-x-0 z-0">
            <ChristmasLights />
         </div>
         <SpookyCobwebs />
      </div>
   );
}

export default Header
