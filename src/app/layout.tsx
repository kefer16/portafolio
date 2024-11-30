import type { Metadata } from "next";
import "./globals.css";
import StarsCanvas from "@/components/stars-canvas";
import { MetaData } from "@/data/metadata.data";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = MetaData;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <html id="html-background" className="scroll-smooth" lang="es">
         <body>
            <StarsCanvas />
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
            >
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}
