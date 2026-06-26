"use client";
import { useEffect, useRef, useState } from "react";

export default function InitialLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!loaderRef.current) return;
    
    // According to the prompt constraints, we must not delay TTI or exceed 500ms
    // We execute a rapid hardware-accelerated fade out.
    const anim = loaderRef.current.animate(
      [{ opacity: 1, backdropFilter: 'blur(10px)' }, { opacity: 0, backdropFilter: 'blur(0px)' }],
      { duration: 400, delay: 100, easing: 'cubic-bezier(0.2, 0, 0, 1)', fill: 'forwards' }
    );

    anim.onfinish = () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[9999] bg-[#101016] flex items-center justify-center pointer-events-none"
    >
      <div className="w-12 h-12 border-2 border-mystic-mint border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
