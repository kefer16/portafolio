
function IframeaSpotify() {
   return (
      <iframe
         data-testid="embed-iframe"
         className="rounded-2xl h-[352px] w-full"
         src="https://open.spotify.com/embed/playlist/5rwfXnar8fE9dnxzrupp0F?utm_source=generator&theme=0"
         // width="100%"
         // height="352"
         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
         loading="lazy"
      >
      </iframe>
   )
}

export default IframeaSpotify