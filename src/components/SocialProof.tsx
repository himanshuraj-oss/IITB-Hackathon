"use client";
import Image from "next/image";
import { useState } from "react";

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10M+", label: "Tasks Automated" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "24/7", label: "Expert Support" }
];

const testimonials = [
  {
    id: 1,
    quote: "Instead of building our own agent logic from scratch, we used Armory. We went from a prototype to a global production launch in weeks.",
    author: "Sarah Chen",
    role: "Lead Engineer at FlowState AI",
    metric: "Saved 8 months of internal R&D",
  },
  {
    id: 2,
    quote: "Armory's neural engines scaled effortlessly during our peak season. The matrix pricing literally saved us hundreds of thousands of dollars.",
    author: "Michael Ross",
    role: "CTO at Nexus Commerce",
    metric: "Reduced infrastructure costs by 40%",
  },
  {
    id: 3,
    quote: "The seamless integration and context-lock features are game-changing. Our data mining pipelines have never been this efficient.",
    author: "Elena Rodriguez",
    role: "Head of Data at Synapse Analytics",
    metric: "Increased data throughput 3x",
  }
];

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-24 px-6 sm:px-12 bg-transparent border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-mono font-medium text-arctic-powder mb-4">Trusted by the Pioneers</h2>
          <p className="text-lg text-arctic-powder/60 font-sans max-w-2xl mx-auto">
            From high-growth startups to enterprise research labs, Armory is the chosen infrastructure for teams building the next era of AI.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full mb-20 border-y border-white/10 py-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-4xl md:text-5xl font-mono font-bold text-deep-saffron mb-2 tracking-tight">{stat.value}</span>
              <span className="text-sm font-sans font-medium text-arctic-powder/70 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="w-full max-w-4xl relative group">
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
            <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Image src="/assets/chevron-left.svg" alt="Prev" width={16} height={16} className="invert opacity-70" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
            <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Image src="/assets/chevron-right.svg" alt="Next" width={16} height={16} className="invert opacity-70" />
            </button>
          </div>

          <div className="w-full bg-black/40 p-8 sm:p-12 md:p-16 rounded-3xl relative overflow-hidden border border-white/10 flex flex-col md:flex-row items-center gap-12 group-hover:border-mystic-mint/30 transition-colors duration-500 min-h-[300px]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-mint/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-6">
                 {/* 5 stars */}
                 {[1,2,3,4,5].map(i => (
                    <Image key={i} src="/assets/cube-16-solid.svg" alt="star" width={14} height={14} className="opacity-100" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(5427%) hue-rotate(352deg) brightness(101%) contrast(105%)' }} />
                 ))}
              </div>
              <p className="text-xl sm:text-2xl font-sans text-arctic-powder/90 leading-relaxed mb-8 transition-opacity duration-300" key={current.quote}>
                "{current.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start transition-opacity duration-300" key={current.author}>
                  <span className="font-mono font-bold text-arctic-powder">{current.author}</span>
                  <span className="text-sm text-mystic-mint font-sans">{current.role}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-32 bg-white/10"></div>
            
            <div className="hidden md:flex flex-col gap-6 z-10 w-48 shrink-0 transition-opacity duration-300" key={current.metric}>
               <div className="text-sm font-mono text-arctic-powder/50 uppercase tracking-widest">Case Study</div>
               <div className="text-lg font-sans font-medium text-arctic-powder">{current.metric}</div>
               <button 
                 onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'download', data: { company: current.author } } }))} 
                 className="flex items-center gap-2 text-deep-saffron font-mono text-sm hover:text-forsythia transition-colors group/btn cursor-pointer"
               >
                 Read Full Study
                 <Image src="/assets/arrow-trending-up.svg" alt="arrow" width={12} height={12} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(5427%) hue-rotate(352deg) brightness(101%) contrast(105%)' }} />
               </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
