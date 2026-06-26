"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import GlassSurface from "./GlassSurface";

const pricingMatrix = {
  tiers: {
    starter: { baseRate: 29 },
    professional: { baseRate: 79 },
    enterprise: { baseRate: 199 },
  },
  multipliers: {
    annual: 0.8, // 20% discount
  },
  regionalTariffs: {
    USD: { rate: 1, symbol: "$" },
    EUR: { rate: 0.92, symbol: "€" },
    INR: { rate: 83, symbol: "₹" },
  },
};

export default function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // State refs (bypassing React re-renders)
  const isAnnualRef = useRef(false);
  const currencyRef = useRef<keyof typeof pricingMatrix.regionalTariffs>("USD");

  // DOM node refs for isolated updates
  const starterPriceRef = useRef<HTMLSpanElement>(null);
  const proPriceRef = useRef<HTMLSpanElement>(null);
  const enterprisePriceRef = useRef<HTMLSpanElement>(null);
  const starterSuffixRef = useRef<HTMLSpanElement>(null);
  const proSuffixRef = useRef<HTMLSpanElement>(null);
  const enterpriseSuffixRef = useRef<HTMLSpanElement>(null);

  const updatePrices = () => {
    const isAnn = isAnnualRef.current;
    const curr = currencyRef.current;
    const tariff = pricingMatrix.regionalTariffs[curr];
    const mult = isAnn ? pricingMatrix.multipliers.annual : 1;

    const getP = (tier: keyof typeof pricingMatrix.tiers) => {
      const val = pricingMatrix.tiers[tier].baseRate * tariff.rate * mult;
      return (val % 1 === 0) ? val.toString() : val.toFixed(2);
    };

    if (starterPriceRef.current) starterPriceRef.current.textContent = getP('starter');
    if (proPriceRef.current) proPriceRef.current.textContent = getP('professional');
    if (enterprisePriceRef.current) enterprisePriceRef.current.textContent = getP('enterprise');

    const suffix = isAnn ? '/mo (annual)' : '/mo';
    if (starterSuffixRef.current) starterSuffixRef.current.textContent = suffix;
    if (proSuffixRef.current) proSuffixRef.current.textContent = suffix;
    if (enterpriseSuffixRef.current) enterpriseSuffixRef.current.textContent = suffix;

    if (containerRef.current) {
      containerRef.current.querySelectorAll('.currency-symbol').forEach(el => {
        el.textContent = tariff.symbol;
      });
      containerRef.current.querySelectorAll('.currency-btn').forEach(btn => {
        const btnCurr = btn.getAttribute('data-curr');
        if (btnCurr === curr) {
          btn.className = `currency-btn px-3 py-1 font-mono text-xs rounded-md transition-all duration-200 bg-deep-saffron text-oceanic-noir font-bold shadow-[0_0_10px_rgba(255,153,50,0.5)]`;
        } else {
          btn.className = `currency-btn px-3 py-1 font-mono text-xs rounded-md transition-all duration-200 text-arctic-powder/70 hover:text-arctic-powder hover:bg-white/10`;
        }
      });
    }
  };

  // Initial values setup
  const initTariff = pricingMatrix.regionalTariffs["USD"];
  const getInitPrice = (t: keyof typeof pricingMatrix.tiers) => pricingMatrix.tiers[t].baseRate.toString();

  return (
    <section id="pricing" ref={containerRef} className="py-24 px-6 sm:px-12 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-16 pointer-events-none">
        <h2 className="text-4xl font-mono font-medium text-arctic-powder mb-4">Transparent Pricing</h2>
        <p className="text-lg text-arctic-powder/60 font-sans">Scale your automation as you grow. No hidden fees.</p>
      </div>

      <div className="relative z-10 flex justify-center mb-16 w-full max-w-[650px] mx-auto">
        <GlassSurface 
          width="100%"
          height="auto"
          borderRadius={40}
          borderWidth={0.05}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={50}
          opacity={0.93}
          mixBlendMode="screen"
          className="p-4 sm:p-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-transparent w-full mx-auto relative z-20 py-2 sm:py-0">
            
            <div className="flex items-center gap-3 px-4">
              <span className="font-mono text-sm font-medium text-arctic-powder/80">Monthly</span>
              <label className="relative inline-flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  onChange={(e) => {
                    isAnnualRef.current = e.target.checked;
                    updatePrices();
                  }} 
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-deep-saffron group-hover:bg-white/30"></div>
              </label>
              <span className="font-mono text-sm font-medium text-arctic-powder/80 whitespace-nowrap">
                Annually <span className="text-deep-saffron text-xs ml-1">(Save 20%)</span>
              </span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/10"></div>

            <div className="flex items-center gap-3 px-4 relative">
              <span className="font-mono text-sm font-medium text-arctic-powder/80">Currency:</span>
              <div className="flex items-center bg-white/5 border border-white/20 rounded-lg p-1 gap-1">
                {Object.keys(pricingMatrix.regionalTariffs).map((key) => (
                  <button
                    key={key}
                    data-curr={key}
                    onClick={() => {
                      currencyRef.current = key as keyof typeof pricingMatrix.regionalTariffs;
                      updatePrices();
                    }}
                    className={`currency-btn px-3 py-1 font-mono text-xs rounded-md transition-all duration-200 ${
                      key === "USD" 
                        ? 'bg-deep-saffron text-oceanic-noir font-bold shadow-[0_0_10px_rgba(255,153,50,0.5)]' 
                        : 'text-arctic-powder/70 hover:text-arctic-powder hover:bg-white/10'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </GlassSurface>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        
        {/* Starter Tier */}
        <div className="flex flex-col p-8 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-mono font-bold text-arctic-powder">Starter</h3>
          <p className="text-arctic-powder/50 mt-2 text-sm">Perfect for individuals and small teams.</p>
          <div className="my-8 flex items-baseline">
            <span className="currency-symbol text-3xl font-bold text-arctic-powder">{initTariff.symbol}</span>
            <span ref={starterPriceRef} className="text-5xl font-bold text-arctic-powder tracking-tight inline-block">{getInitPrice('starter')}</span>
            <span ref={starterSuffixRef} className="text-sm text-arctic-powder/40 ml-2 font-mono">/mo</span>
          </div>
          <ul className="flex flex-col gap-4 flex-1 mb-8">
            <li className="flex items-center gap-3 text-sm text-arctic-powder/80"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-50" /> 10,000 tasks/mo</li>
            <li className="flex items-center gap-3 text-sm text-arctic-powder/80"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-50" /> Basic Analytics</li>
            <li className="flex items-center gap-3 text-sm text-arctic-powder/40"><Image src="/assets/x-mark.svg" alt="" width={12} height={12} className="invert opacity-30" /> Dedicated Support</li>
          </ul>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'checkout', data: { tier: 'Starter', isTrial: false } } }))} className="w-full py-3 rounded-md bg-white/5 border border-white/20 text-arctic-powder font-mono font-semibold hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2">
            Get Started
            <Image src="/assets/link-solid.svg" alt="" width={14} height={14} className="invert opacity-70" />
          </button>
        </div>

        {/* Professional Tier */}
        <div className="flex flex-col p-8 rounded-2xl bg-white/5 border border-deep-saffron/50 shadow-[0_0_40px_-10px_rgba(255,153,50,0.15)] relative transform md:-translate-y-4 hover:-translate-y-5 transition-all duration-300">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-deep-saffron text-oceanic-noir px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase font-mono flex items-center gap-1">
            <Image src="/assets/chevron-up-solid.svg" alt="" width={10} height={10} className="opacity-80" />
            Most Popular
          </div>
          <h3 className="text-xl font-mono font-bold text-arctic-powder">Professional</h3>
          <p className="text-arctic-powder/50 mt-2 text-sm">For growing businesses needing power.</p>
          <div className="my-8 flex items-baseline">
            <span className="currency-symbol text-3xl font-bold text-arctic-powder">{initTariff.symbol}</span>
            <span ref={proPriceRef} className="text-5xl font-bold text-arctic-powder tracking-tight inline-block">{getInitPrice('professional')}</span>
            <span ref={proSuffixRef} className="text-sm text-arctic-powder/40 ml-2 font-mono">/mo</span>
          </div>
          <ul className="flex flex-col gap-4 flex-1 mb-8">
            <li className="flex items-center gap-3 text-sm text-arctic-powder/90"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-100" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(5427%) hue-rotate(352deg) brightness(101%) contrast(105%)' }} /> 100,000 tasks/mo</li>
            <li className="flex items-center gap-3 text-sm text-arctic-powder/90"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-100" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(5427%) hue-rotate(352deg) brightness(101%) contrast(105%)' }} /> Advanced Analytics</li>
            <li className="flex items-center gap-3 text-sm text-arctic-powder/90"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-100" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(5427%) hue-rotate(352deg) brightness(101%) contrast(105%)' }} /> Priority Support</li>
          </ul>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'checkout', data: { tier: 'Professional', isTrial: true } } }))} className="w-full py-3 rounded-md bg-deep-saffron text-oceanic-noir font-mono font-bold hover:bg-forsythia transition-colors duration-200 shadow-[0_5px_20px_-5px_rgba(255,153,50,0.4)]">
            Start Free Trial
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="flex flex-col p-8 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-mono font-bold text-arctic-powder">Enterprise</h3>
          <p className="text-arctic-powder/50 mt-2 text-sm">Custom solutions for massive scale.</p>
          <div className="my-8 flex items-baseline">
            <span className="currency-symbol text-3xl font-bold text-arctic-powder">{initTariff.symbol}</span>
            <span ref={enterprisePriceRef} className="text-5xl font-bold text-arctic-powder tracking-tight inline-block">{getInitPrice('enterprise')}</span>
            <span ref={enterpriseSuffixRef} className="text-sm text-arctic-powder/40 ml-2 font-mono">/mo</span>
          </div>
          <ul className="flex flex-col gap-4 flex-1 mb-8">
            <li className="flex items-center gap-3 text-sm text-arctic-powder/80"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-50" /> Unlimited tasks/mo</li>
            <li className="flex items-center gap-3 text-sm text-arctic-powder/80"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-50" /> Custom Analytics</li>
            <li className="flex items-center gap-3 text-sm text-arctic-powder/80"><Image src="/assets/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-50" /> 24/7 Dedicated Support</li>
          </ul>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'contact' } }))} className="w-full py-3 rounded-md bg-white/5 border border-white/20 text-arctic-powder font-mono font-semibold hover:bg-white/10 transition-colors duration-200">
            Contact Sales
          </button>
        </div>

      </div>
    </section>
  );
}
