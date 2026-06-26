"use client";
import Image from "next/image";
import GlassSurface from "./GlassSurface";
import StaggeredMenu from "./StaggeredMenu";
import { useEffect, useRef } from "react";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Platform', ariaLabel: 'View our platform', link: '#features' },
  { label: 'Pricing', ariaLabel: 'View our pricing', link: '#pricing' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#' }
];

const socialItems = [
  { label: 'Twitter', link: '#' },
  { label: 'GitHub', link: '#' },
  { label: 'LinkedIn', link: '#' }
];

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const text = "ARMORY";
    titleRef.current.textContent = "";
    
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      titleRef.current?.appendChild(span);

      span.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 50, delay: index * 120 + 400, fill: "forwards", easing: "steps(1)" }
      );
    });

    const cursor = document.createElement("span");
    cursor.textContent = "_";
    cursor.style.color = "#FF9932";
    cursor.style.marginLeft = "8px";
    titleRef.current?.appendChild(cursor);

    cursor.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 500, iterations: Infinity, direction: "alternate", easing: "steps(1)" }
    );
  }, []);

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-center px-6 sm:px-12 bg-transparent min-h-screen">

      {/* Staggered Menu overriding previous Nav */}
      <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#F1F6F4"
          openMenuButtonColor="#172B36"
          changeMenuColorOnOpen={true}
          colors={['#172B36', '#114C5A', '#FF9932']}
          logoUrl="/assets/cog-8-tooth.svg"
          accentColor="#FF9932"
          isFixed={true}
        />
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 pointer-events-none relative w-full h-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-mystic-mint/20 bg-white/5 backdrop-blur-md shadow-sm transition-colors group pointer-events-auto cursor-pointer" onClick={() => alert('Opening speed run details...')}>
          <Image src="/assets/arrow-trending-up.svg" alt="Trending" width={16} height={16} className="invert group-hover:-translate-y-0.5 transition-transform duration-300" />
          <span className="text-sm font-semibold tracking-wide text-mystic-mint">Next-Gen Platform Speed Run</span>
        </div>

        <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-8xl font-mono font-bold leading-tight tracking-tighter text-arctic-powder mt-8">
          ARMORY
        </h1>

        <p className="text-lg sm:text-xl text-arctic-powder/70 max-w-2xl font-sans leading-relaxed mx-auto">
          Deploy custom enterprise agents and automate complex workflows. Scale your intelligence with our neural engines today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 pointer-events-auto">
          <GlassSurface 
            width={240} 
            height={60} 
            borderRadius={30}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.93}
            mixBlendMode="screen"
            className="cursor-pointer group"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('features');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full h-full text-arctic-powder font-mono font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out flex items-center justify-center gap-3 bg-transparent border-none outline-none"
            >
              Build A Workflow
              <Image src="/assets/chevron-right.svg" alt="Arrow Right" width={16} height={16} className="invert group-hover:translate-x-1 transition-transform" />
            </button>
          </GlassSurface>
        </div>
      </div>
    </section>
  );
}
