import type { Metadata } from "next";
import "./globals.css";
import ThemeCanvas from "@/components/theme-canvas";
import { MetaData } from "@/data/metadata.data";
import { ReactNode } from "react";
// import { ThemeProvider } from "@/components/theme-provider";
import HeroUIProviders from "@/provider/hero-ui.provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Footer from "@/components/footer";
import VillageSilhouette from "@/components/village-silhouette";
import SpookySilhouette from "@/components/spooky-silhouette";
import MoonscapeSilhouette from "@/components/moonscape-silhouette";

export const metadata: Metadata = MetaData;
// import { Noto_Sans } from "next/font/google"

// const open_sans = Noto_Sans({
//    subsets: ["latin"],
//    weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
// })


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <html id="html-background" className="scroll-smooth dark" lang="es" suppressHydrationWarning>
         <link rel="icon" href="/favicon.ico" sizes="any" />
         <body>
            <a
               href="#main-content"
               className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
            >
               Saltar al contenido
            </a>
            <HeroUIProviders>
               {/*
                  All three themes (space, christmas, halloween) are dark
                  scenes now, so "dark" is a permanent class above, outside
                  next-themes' control - it manages "space"/"christmas"/
                  "halloween" as a separate class, which is what the
                  space-theme:/christmas-theme:/halloween: variants key off.
                  This keeps every HeroUI component (Chip, Card, Dropdown...)
                  in its dark styling everywhere, instead of re-overriding
                  each one by hand for three dark themes.
               */}
               <NextThemesProvider attribute="class" defaultTheme="space" themes={["space", "christmas", "halloween"]}>
                  <ThemeCanvas />
                  <MoonscapeSilhouette />
                  <VillageSilhouette />
                  <SpookySilhouette />
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
