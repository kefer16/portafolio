import type { Metadata } from "next";
import "./globals.css";
import ThemeCanvas from "@/components/theme-canvas";
import { MetaData } from "@/data/metadata.data";
import { ReactNode } from "react";
// import { ThemeProvider } from "@/components/theme-provider";
import HeroUIProviders from "@/provider/hero-ui.provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Footer from "@/components/footer";

export const metadata: Metadata = MetaData;
// import { Noto_Sans } from "next/font/google"

// const open_sans = Noto_Sans({
//    subsets: ["latin"],
//    weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
// })


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <html id="html-background" className="scroll-smooth" lang="es">
         <link rel="icon" href="/favicon.ico" sizes="any" />
         <body>
            <a
               href="#main-content"
               className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
            >
               Saltar al contenido
            </a>
            <HeroUIProviders>
               <NextThemesProvider attribute="class" defaultTheme="dark">
                  <ThemeCanvas />
                  <main id="main-content" className="relative z-20 min-h-screen flex flex-col">
                     {children}
                     <Footer />
                  </main>
               </NextThemesProvider>
            </HeroUIProviders>
         </body>
      </html>
   );
}
