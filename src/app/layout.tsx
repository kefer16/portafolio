import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
   metadataBase: new URL("https://kefer.dev"),
   title: "Portafolio | Kevin Morales Figueroa",
   description: "Portafolio Web",
   openGraph: {
      title: "Portafolio | Kevin Morales Figueroa",
      description: "Portafolio Web",
      type: "website",
      url: "https://kefer.dev",
      images: "/login.jpeg",
      siteName: "@kefer.dev",
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
