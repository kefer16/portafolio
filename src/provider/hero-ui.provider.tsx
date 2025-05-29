import { HeroUIProvider } from '@heroui/react'

export default function HeroUIProviders({ children }: { children: React.ReactNode }) {
   return (
      <HeroUIProvider>
         {children}
      </HeroUIProvider>
   )
}