import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StarsCanvas from "@/components/stars-canvas";

export const metadata: Metadata = {
   metadataBase: new URL("https://kefer.dev/"),
   title: "Portafolio | Kevin Morales",
   description: "Portafolio Web de Kevin Fernando Morales Figueroa",
   openGraph: {
      title: "Portafolio | Kevin Morales",
      description: "Portafolio Web de Kevin Fernando Morales Figueroa",
      url: "https://kefer.dev/",
      type: "website",
      images: "home.png",
      siteName: "kefer.dev",
   },
   twitter: {
      card: "summary_large_image",
      title: "Portafolio - Kevin Morales",
      description: "Portafolio Web de Kevin Fernando Morales Figueroa",
      images: "home.png",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html id="html-background" className="scroll-smooth" lang="en">
         {/* <head>
            <link rel="canonical" href="https://kefer.dev" />
            <meta property="og:image" content="https:///kefer.dev/login.jpeg" />
         </head> */}
         <body>
            <StarsCanvas />
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
