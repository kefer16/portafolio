import { Metadata } from "next";

export const MetaData: Metadata = {
   metadataBase: new URL("https://kefer.dev/"),
   title: "Kevin Morales - Portafolio",
   description: "Portafolio de Kevin Fernando Morales Figueroa",
   openGraph: {
      title: "Kevin Morales - Portafolio",
      description: "Portafolio Web de Kevin Fernando Morales Figueroa",
      url: "https://kefer.dev/",
      type: "website",
      images: "home.png",
      siteName: "kefer.dev",
   },
   twitter: {
      card: "summary_large_image",
      title: "Kevin Morales - Portafolio",
      description: "Portafolio Web de Kevin Fernando Morales Figueroa",
      images: "home.png",
   },
};