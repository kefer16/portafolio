import type { Metadata } from "next";
import "./globals.css";
import StarsCanvas from "@/components/stars-canvas";
import { MetaData } from "@/data/metadata.data";
import { ReactNode } from "react";
// import { ThemeProvider } from "@/components/theme-provider";
import HeroUIProviders from "@/provider/hero-ui.provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const metadata: Metadata = MetaData;
// import { Noto_Sans } from "next/font/google"

// const open_sans = Noto_Sans({
//    subsets: ["latin"],
//    weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
// })


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <html id="html-background" className="scroll-smooth" lang="es">
         <body>
            <HeroUIProviders>
               <StarsCanvas />
               <NextThemesProvider attribute="class" defaultTheme="dark">

                  {children}
               </NextThemesProvider>
            </HeroUIProviders>
         </body>
      </html>
   );
}
