"use client";
import { useState } from "react";
import Image from "next/image";

const features = [
  {
    id: 0,
    title: "Secure Guard",
    description: "We fortify your AI deployments with robust security protocols. Our team ensures every model adheres to strict data privacy standards.",
    icon: "cube-16-solid.svg",
    className: "md:col-span-1 md:row-span-1 bg-black/40",
  },
  {
    id: 1,
    title: "Agent Build",
    description: "Tailored AI agents designed for your specific needs. We develop custom logic and workflows that integrate deeply with your existing tools.",
    icon: "link.svg",
    className: "md:col-span-1 md:row-span-1 bg-black/40",
  },
  {
    id: 2,
    title: "Cloud Scale",
    description: "Infrastructure optimization for high-traffic AI apps. We ensure your systems remain fast, responsive, and ready for any level of demand.",
    icon: "arrow-path.svg",
    className: "md:col-span-1 md:row-span-1 bg-black/40",
  },
  {
    id: 3,
    title: "Data Mining",
    description: "Transform raw information into actionable intelligence. We build the pipelines and vector stores that power your organization's future.",
    icon: "chart-pie.svg",
    className: "md:col-span-1 md:row-span-1 bg-black/40",
  }
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="features" className="py-24 px-6 sm:px-12 bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 text-center md:text-left">
          <div className="flex justify-center md:justify-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
              <Image src="/assets/search.svg" alt="" width={16} height={16} className="invert" />
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
              <Image src="/assets/cog-8-tooth.svg" alt="" width={16} height={16} className="invert" />
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
               <Image src="/assets/cube-16-solid.svg" alt="" width={16} height={16} className="invert" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-medium text-arctic-powder leading-tight max-w-3xl">
            Integrate with the world's most powerful neural engines. Seamlessly connect your custom data...
          </h2>
        </div>

        {/* 
          Desktop: grid (bento)
          Mobile: flex-col (accordion)
        */}
        <div className="flex flex-col md:grid md:grid-cols-4 md:auto-rows-[1fr] gap-4 min-h-[300px]">
          {features.map((feature: any) => {
            const isActive = activeIndex === feature.id;
            
            return (
              <div
                key={feature.id}
                className={`group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out cursor-pointer flex flex-col p-6 sm:p-8
                  ${feature.className}
                  border border-white/10 hover:border-mystic-mint/50 hover:bg-white/5
                  ${isActive ? 'md:bg-white/5 md:border-mystic-mint/30' : ''}
                `}
                onMouseEnter={() => setActiveIndex(feature.id)}
                onClick={() => setActiveIndex(feature.id)}
              >
                {/* Accordion Header (Mobile) / Bento Title (Desktop) */}
                <div className="flex items-center justify-between z-10 w-full mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image src={`/assets/${feature.icon}`} alt={feature.title} width={24} height={24} className="invert opacity-90" />
                  </div>
                  
                  {/* Chevrons only visible on Mobile to indicate accordion */}
                  <div className="md:hidden">
                    <Image 
                      src={isActive ? "/assets/chevron-up.svg" : "/assets/chevron-down.svg"} 
                      alt="Toggle" 
                      width={20} 
                      height={20} 
                      className="invert opacity-70 transition-transform duration-300" 
                    />
                  </div>
                </div>

                <h3 className="text-xl font-sans font-medium text-arctic-powder z-10 mb-2">{feature.title}</h3>

                {/* Content Area */}
                {/* On Mobile: Grid transition for accordion. On Desktop: Always block */}
                <div 
                  className={`z-10 w-full
                    md:!grid md:grid-rows-[1fr] 
                    grid transition-[grid-template-rows,opacity] duration-[400ms] ease-in-out
                    ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:opacity-100'}
                  `}
                >
                  <div className="overflow-hidden">
                    <p className="font-sans text-sm text-arctic-powder/60 pt-2 sm:pt-0 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
