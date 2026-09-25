"use client";

import { useEffect, useState } from "react";

// The iframe's onLoad event can fire before React attaches the listener
// (a race condition when the browser has the embed cached), so it can't be
// trusted to ever fire. We also have no cross-origin signal for when Apple's
// widget finishes fetching the playlist data behind its own placeholder.
// A fixed delay, calibrated against how long that takes in practice, is the
// only reliable way to know when to reveal the iframe.
const LOADING_MS = 3500;

function IframeAppleMusic() {
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), LOADING_MS);
      return () => clearTimeout(timer);
   }, []);

   return (
      <div className="relative h-[450px] w-full">
         {!loaded && (
            <div className="absolute inset-0 rounded-2xl bg-default-100 flex flex-col items-center justify-center gap-3">
               <div className="h-8 w-8 rounded-full border-2 border-default-300 border-t-primary animate-spin" />
               <p className="text-muted-foreground text-sm">Cargando playlist de Apple Music...</p>
            </div>
         )}
         <iframe
            data-testid="embed-iframe"
            className={`rounded-2xl h-[450px] w-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            src="https://embed.music.apple.com/pe/playlist/top-kefer/pl.u-oZylD6eCqZRJJqX"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
         >
         </iframe>
      </div>
   )
}

export default IframeAppleMusic
