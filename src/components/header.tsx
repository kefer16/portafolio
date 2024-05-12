import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSeparator,
   MenubarShortcut,
   MenubarTrigger,
} from "@/components/ui/menubar";
export default function Header() {
   return (
      <div className="flex w-full justify-center">
         <div className="flex justify-center w-full max-w-[1440px] py-10">
            <Menubar>
               <MenubarMenu>
                  <MenubarTrigger>Home</MenubarTrigger>
                  {/* <MenubarContent>
                     <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                     </MenubarItem>
                  </MenubarContent> */}
               </MenubarMenu>
               <MenubarMenu>
                  <MenubarTrigger>Experience</MenubarTrigger>
               </MenubarMenu>

               <MenubarMenu>
                  <MenubarTrigger>Projects</MenubarTrigger>
               </MenubarMenu>

               <MenubarMenu>
                  <MenubarTrigger>Contact</MenubarTrigger>
               </MenubarMenu>
            </Menubar>
         </div>
      </div>
   );
}
