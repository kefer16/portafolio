import { Metadata } from "next";

export const MetaData: Metadata = {
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