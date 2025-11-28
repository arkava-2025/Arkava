import { useEffect, useState } from "react";

export default function HeroMedia() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();

    console.log('check', check);
    

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [setMobile]);

  console.log('mobilegf g', mobile);
  

  return mobile ? (
    <img
      src="https://jbmqxuofkzwe1rde.public.blob.vercel-storage.com/hero-bf-mobile.gif"
      className="w-full h-full object-cover"
    />
  ) : (
    <video
      src="https://res.cloudinary.com/dx9vtev71/video/upload/v1764281243/hero-bf_ab0mgf.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-cover"
    />
  );
}
