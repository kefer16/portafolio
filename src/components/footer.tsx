import { Link } from "@heroui/link";
import { Mail } from "lucide-react";
import { PresentationData } from "@/data/presentacion.data";
import GithubIcon from "@/components/icons/github-icon";

function Footer() {
   const { email, last_name } = PresentationData;
   const year = new Date().getFullYear();

   return (
      <footer className="flex w-full justify-center border-t border-divider mt-auto">
         <div className="flex w-full max-w-[1440px] px-5 py-6 flex-col gap-4 items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-default-500">© {year} {last_name}</p>
            <div className="flex gap-4">
               <Link
                  isExternal
                  href="https://github.com/kefer16"
                  aria-label="GitHub de Kevin Morales"
                  color="foreground"
               >
                  <GithubIcon size={20} />
               </Link>
               <Link
                  href={`mailto:${email}`}
                  aria-label="Enviar correo a Kevin Morales"
                  color="foreground"
               >
                  <Mail size={20} strokeWidth={2} />
               </Link>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
