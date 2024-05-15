import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
   metadataBase: new URL("https://kefer.dev/"),
   title: "Portafolio | Kevin Morales Figueroa",
   description: "Portafolio Web",
   openGraph: {
      title: "Portafolio | Kevin Morales Figueroa",
      description: "Portafolio Web",
      url: "https://kefer.dev/",
      type: "website",
      images: "login.jpeg",
      siteName: "kefer",
   },
   twitter: {
      card: "summary_large_image",
      title: "Portafolio - Kevin Morales Figueroa",
      description: "Portafolio Web",
      images: "login.jpeg",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html className="scroll-smooth" lang="en">
         {/* <head>
            <link rel="canonical" href="https://kefer.dev" />
            <meta property="og:image" content="https:///kefer.dev/login.jpeg" />
         </head> */}
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
