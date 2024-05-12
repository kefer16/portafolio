import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
   title: "Portafolio - Kevin Morales Figueroa",
   description: "Kevin Morales Figueroa",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               // enableSystem
               // disableTransitionOnChange
            >
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}
